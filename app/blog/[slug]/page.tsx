import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CustomMDX } from "@/app/components/mdx";

const postsDirectory = "./app/blog/posts";

function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .map((filename) => filename.replace(/\.mdx?$/, ""));
}

async function getPostData(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  return {
    content: content,
    frontMatter: data,
  };
}

// Generates static pages for all slugs during the build
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: any }) {
  const { slug } = params;
  const { content, frontMatter } = await getPostData(slug);

  return (
    <div>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {frontMatter.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {frontMatter.date}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </div>
  );
}
