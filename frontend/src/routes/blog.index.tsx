import { createFileRoute, Link } from "@tanstack/react-router";
import { formatDateString } from "../utils/utils";
import { useEffect, useState } from "react";
import { Post, processPosts } from "../modules/blog-post-preprocess";
import { ArrowIcon } from "../components/footer";

export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/blog-post.json")
      .then((res) => res.json())
      .then((data) => {
        const posts = processPosts(data);
        setPosts(posts);
      })
      .catch((err) => console.error("Error loading blog posts:", err));
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li className="mb-4">
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
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
        <li className="mb-4 mx-8">
          <Link
            to="/blog/editor"
            className="text-neutral-500 dark:text-neutral-400 italic text-sm flex items-center gap-1 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
          >
            Open Editor
            <ArrowIcon />
          </Link>
        </li>
      </ul>
    </div>
  );
}
