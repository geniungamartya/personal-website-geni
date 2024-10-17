import { BlogPost } from "@/app/components/mdx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostData, getPostSlugs } from "@/app/service/blogService";

// Generates static pages for all slugs during the build
export function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata | null {
  const { slug } = params;
  const postData = getPostData(slug);
  if (!postData) {
    return notFound();
  }
  const { frontMatter } = postData;

  return {
    title: frontMatter.title,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const postData = getPostData(slug);
  if (!postData) {
    notFound();
  }
  return <BlogPost {...postData} />;
}
