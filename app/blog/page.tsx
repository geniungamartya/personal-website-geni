import Link from "next/link";
import { formatDateString } from "../utils";
import { getAllPosts } from "../service/blogService";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      {/* <h1>My Blog</h1> */}
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link href={`/blog/${post.slug}`}>
              <div className="w-full flex flex-col md:flex-row md:items-center space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 min-w-[140px] tabular-nums">
                  {formatDateString(post.frontMatter.date)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-grow">
                  {post.frontMatter.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
