import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Post, processPosts } from "../../modules/blog-post-preprocess";
import MDEditor from "@uiw/react-md-editor";
import { formatDateString } from "../../utils/utils";
import NotFound from "../../components/not-found";

export const Route = createFileRoute("/_layout/blog/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = useParams({ strict: false });
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch("/blog-post.json")
      .then((res) => res.json())
      .then((data) => {
        const posts = processPosts(data);
        const foundPost = posts.find((p) => p.slug === slug);
        setPost(foundPost || null);
      })
      .catch((err) => console.error("Error loading blog post:", err));
  }, [slug]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.data.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDateString(post.data.date)}
        </p>
      </div>
      <MDEditor.Markdown source={post.data.content} />
    </div>
  );
}
