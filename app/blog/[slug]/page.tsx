import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";

const postsDirectory = "./app/blog/posts";

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .map((filename) => filename.replace(/\.mdx?$/, ""));
}

export async function getPostData(slug: unknown) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  console.log(filePath)
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
  console.log(slugs.map((slug) => ({ slug })))
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: {params: any}) {
  const { slug } = params;
  const { content, frontMatter } = await getPostData(slug);

  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={content} />
    </div>
  );
}
