import { describe, expect, it } from "vitest";
import { processPosts, slugify, PostData, Post } from "./blog-post-preprocess";

describe("slugify", () => {
  it("should convert title to a slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("  Trim This  ")).toBe("trim-this");
    expect(slugify("Special & Characters!")).toBe("special-and-characters");
    expect(slugify("Multiple   Spaces")).toBe("multiple-spaces");
    expect(slugify("Already-a-slug")).toBe("already-a-slug");
    expect(slugify("UPPERCASE Title")).toBe("uppercase-title");
  });

  it("should handle empty strings correctly", () => {
    expect(slugify("")).toBe("");
  });

  it("should remove special characters except hyphens", () => {
    expect(slugify("Hello@World!")).toBe("helloworld");
    expect(slugify("123 Numbers 456")).toBe("123-numbers-456");
  });
});

describe("processPosts", () => {
  it("should generate correct slugs and sort posts by date (newest first)", () => {
    const posts: PostData[] = [
      {
        title: "First Post",
        date: "2024-06-01",
        content: "Content 1",
        slug: "",
      },
      {
        title: "Second Post",
        date: "2024-06-10",
        content: "Content 2",
        slug: "",
      },
      { title: "Old Post", date: "2023-12-31", content: "Content 3", slug: "" },
    ];

    const result: Post[] = processPosts(posts);

    // Expected order: Second Post (2024-06-10) > First Post (2024-06-01) > Old Post (2023-12-31)
    expect(result).toHaveLength(3);
    expect(result[0].data.title).toBe("Second Post");
    expect(result[0].slug).toBe("second-post");
    expect(result[1].data.title).toBe("First Post");
    expect(result[1].slug).toBe("first-post");
    expect(result[2].data.title).toBe("Old Post");
    expect(result[2].slug).toBe("old-post");
  });

  it("should handle an empty array input", () => {
    const result = processPosts([]);
    expect(result).toEqual([]);
  });

  it("should return a single post correctly", () => {
    const posts: PostData[] = [
      {
        title: "Single Post",
        date: "2025-01-01",
        content: "Only one post",
        slug: "",
      },
    ];

    const result = processPosts(posts);
    expect(result).toHaveLength(1);
    expect(result[0].data.title).toBe("Single Post");
    expect(result[0].slug).toBe("single-post");
  });

  it("should handle posts with the same date without breaking", () => {
    const posts: PostData[] = [
      { title: "Post One", date: "2024-06-01", content: "Content 1", slug: "" },
      { title: "Post Two", date: "2024-06-01", content: "Content 2", slug: "" },
    ];

    const result = processPosts(posts);
    expect(result).toHaveLength(2);
  });
});
