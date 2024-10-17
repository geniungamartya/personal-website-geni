import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { notFound } from "next/navigation";
import PostPage, { generateStaticParams } from "./page";
import { getPostData, getPostSlugs } from "@/app/service/blogService";
import { BlogPost } from "@/app/components/mdx";
import { Suspense } from "react";

vi.mock("fs");
vi.mock("gray-matter");
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));
vi.mock("@/app/components/mdx.tsx", () => ({
  BlogPost: (postData: any) => <div {...postData}>Post Blog</div>,
}));
vi.mock("@/app/service/blogService");

describe("generateStaticParams", () => {
  it("should generate static params for each slug", () => {
    vi.mocked(getPostSlugs).mockReturnValue(["post1", "post2"] as any);
    const params = generateStaticParams();
    expect(params).toEqual([{ slug: "post1" }, { slug: "post2" }]);
  });
});

describe("PostPage component", () => {
  it("should return blog post component", () => {
    const mockPostData = {
      content: "This is the content of the post",
      frontMatter: {
        title: "Test Post",
        date: "2024-10-13",
      },
      slug: "test",
    };
    vi.mocked(getPostData).mockReturnValue(mockPostData);

    const Result = PostPage({ params: { slug: "test" } });
    const { debug } = render(Result);
    // debug()

    const blogPost = screen.getByText("Post Blog");
    expect(blogPost).toBeInTheDocument();
    expect(blogPost).toHaveAttribute(
      "content",
      "This is the content of the post",
    );
  });

  it("should call notFound if postData does not exist", () => {
    // Mock getPostData to return null, simulating a non-existent post
    vi.mocked(getPostData).mockReturnValue(null);

    // Render the PostPage component with a mock slug and await its resolution
    const Result = PostPage({ params: { slug: "test" } });
    const { debug } = render(Result);
    // debug()

    // Assert that notFound was called
    expect(notFound).toHaveBeenCalled();
  });
});
