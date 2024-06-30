import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CustomMDX } from "@/app/components/mdx";
import { formatDateString } from "@/app/utils";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

const postsDirectory = "./app/blog/posts";

interface FrontMatter {
  title: string;
  date: string;
  [key: string]: any;
}

interface PostData {
  content: string;
  frontMatter: FrontMatter;
}

function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .map((filename) => filename.replace(/\.mdx?$/, ""));
}

async function getPostData(slug: string): Promise<PostData | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  return {
    content: content,
    frontMatter: data as FrontMatter,
  };
}

// Generates static pages for all slugs during the build
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface PostPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params, searchParams }: PostPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata | null> {
  const { slug } = params;
  const postData = await getPostData(slug);
  if (!postData) {
    return notFound();
  }
  const { frontMatter } = postData;

  return {
    title: frontMatter.title,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;
  const postData = await getPostData(slug);
  if (!postData) {
    notFound();
  }
  const { content, frontMatter } = postData;

  return (
    <div>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {frontMatter.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDateString(frontMatter.date)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </div>
  );
}
