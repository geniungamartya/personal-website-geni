import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { formatDateString } from "../utils";

interface FrontMatter {
  title: string;
  date: string;
  [key: string]: any;
}

interface Post {
  data: FrontMatter;
  slug: string;
}

async function getPosts(): Promise<Post[]> {
  const postsDirectory = "./app/blog/posts";
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      data: data as FrontMatter,
      slug: filename.replace(/\.mdx?$/, ""),
    };
  });

  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);
    return dateB.getTime() - dateA.getTime();
  });

  return posts;
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      {/* <h1>My Blog</h1> */}
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link href={`/blog/${post.slug}`}>
              <div className="w-full flex flex-col md:flex-row md:items-center space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 min-w-[140px] tabular-nums">
                  {formatDateString(post.data.date)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-grow">
                  {post.data.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
