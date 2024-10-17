import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = "./app/blog/posts";

export interface FrontMatter {
  title: string;
  date: string;
}

export interface PostData {
  content: string;
  frontMatter: FrontMatter;
  slug: string;
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
    slug: slug,
  };
}

export function getAllPosts(): PostData[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostData(slug))
    .filter(Boolean) as PostData[]; // Filter out any null values;

  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontMatter.date);
    const dateB = new Date(b.frontMatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}
