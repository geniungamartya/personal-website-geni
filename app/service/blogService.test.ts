import { describe, it, expect, vi } from "vitest";
import fs from "fs";
import matter from "gray-matter";
import {
  FrontMatter,
  getPostData,
  getPostSlugs,
} from "@/app/service/blogService";

vi.mock("fs");
vi.mock("gray-matter");

describe("getPostSlugs", () => {
  it("should return slugs from filenames in the posts directory", () => {
    vi.mocked(fs.readdirSync).mockReturnValue([
      "post1.mdx",
      "post2.mdx",
    ] as any);

    const slugs = getPostSlugs();
    expect(fs.readdirSync).toHaveBeenCalledWith("./app/blog/posts");
    expect(slugs).toEqual(["post1", "post2"]);
  });
});

describe("getPostData", () => {
  it("should return post content and front matter when file exists", async () => {
    const mockContent = "Post Content";
    const mockData: FrontMatter = { title: "Post Title", date: "2023-10-10" };
    const mockMatterResult = {
      content: mockContent,
      data: mockData,
    };

    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(matter).mockReturnValue(mockMatterResult as any);

    const result = getPostData("post-1");
    expect(fs.readFileSync).toHaveBeenLastCalledWith(
      "app/blog/posts/post-1.mdx",
      "utf8",
    );
    expect(result).toEqual({
      content: mockContent,
      frontMatter: mockData,
    });
  });

  it("should return null if file doesn't exist", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(false);
    const result = await getPostData("non-existent-post");
    expect(result).toBeNull();
    expect(fs.existsSync).toHaveBeenCalledWith(
      "app/blog/posts/non-existent-post.mdx",
    );
  });
});
