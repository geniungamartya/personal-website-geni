import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = "./app/blog/posts";

export interface FrontMatter {
  title: string;
  date: string;
  [key: string]: any;
}

export interface PostData {
  content: string;
  frontMatter: FrontMatter;
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .map((filename) => filename.replace(/\.mdx?$/, ""));
}

export function getPostData(slug: string): PostData | null {
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
