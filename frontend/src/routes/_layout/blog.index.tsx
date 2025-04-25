import { createFileRoute, Link } from "@tanstack/react-router";
import { formatDateString } from "../../utils/utils";
import { ArrowIcon } from "../../components/footer";
import { useQuery } from "@tanstack/react-query";
import { BlogService } from "../../client";

export const Route = createFileRoute("/_layout/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => BlogService.getAllBlogPostsBlogGet(),
  });

  const sortedPosts = posts?.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  if (error) {
    console.error("Error loading blog posts:", error);
  }

  return (
    <div>
      {isLoading ? (
        <p className="text-gray-600 text-sm text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-sm text-center">
          Error fetching posts.
        </p>
      ) : (
        <ul>
          {sortedPosts &&
            sortedPosts.map((post) => (
              <li className="mb-4">
                <Link to="/blog/$slug" params={{ slug: post.slug }}>
                  <div className="w-full flex flex-col md:flex-row md:items-center space-x-0 md:space-x-2">
                    <p className="text-neutral-600 dark:text-neutral-400 min-w-[140px] tabular-nums">
                      {formatDateString(post.date)}
                    </p>
                    <p className="text-neutral-900 dark:text-neutral-100 tracking-tight flex-grow">
                      {post.title}
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
      )}
    </div>
  );
}
