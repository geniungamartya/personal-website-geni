import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomMDX, slugify, Code, createHeading, BlogPost } from "./mdx";
import { highlight } from "sugar-high";
import React from "react";
import { PostData } from "../service/blogService";
import { formatDateString } from "../utils";

describe("slugify function", () => {
  it("should correctly slugify strings", () => {
    expect(slugify("Hello World")).toBe("hello-world");
    expect(slugify("React & Vue")).toBe("react-and-vue");
    expect(slugify("  Multiple   Spaces ")).toBe("multiple-spaces");
    expect(slugify("Special # Characters!!")).toBe("special-characters");
  });
});

// Mock Sugar High
vi.mock("sugar-high", () => ({
  highlight: vi.fn((code) => `<span>${code}</span>`),
}));

// Mock Next Mdx
vi.mock("next-mdx-remote/rsc", () => ({
  MDXRemote: (props: any) => <div {...props}>MDX content with components</div>,
}));

describe("Code component", () => {
  it("should render highlighted code inside a <code> tag", () => {
    render(<Code>{"const a = 10;"}</Code>);
    const codeElement = screen.getByText("const a = 10;");
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.tagName).toBe("SPAN");
  });

  it("should call highlight function with code", () => {
    render(<Code>{"const b = 20;"}</Code>);
    expect(highlight).toHaveBeenCalledWith("const b = 20;");
  });
});

describe("createHeading function", () => {
  it("should create a heading with the correct level and slug", () => {
    const Heading = createHeading(2);
    const { container, debug } = render(
      <Heading>{"This is a Heading"}</Heading>,
    );

    const headingElement = screen.getByText("This is a Heading");
    expect(headingElement.tagName).toBe("H2");

    // Get the closest anchor element
    const anchorElement = headingElement.querySelector("a");
    expect(anchorElement).not.toBeNull();
    expect(anchorElement).toHaveAttribute("href", "#this-is-a-heading");
    expect(anchorElement).toHaveClass("anchor");
  });
});

// Test the CustomMDX component
describe("CustomMDX component", () => {
  it("should render MDXRemote with the provided components", () => {
    const { debug } = render(<CustomMDX source="Some MDX content" />);

    const mdxContent = screen.getByText("MDX content with components");
    expect(mdxContent).toBeInTheDocument();

    // Assert MDXRemote was called with the correct arguments
    expect(mdxContent).toHaveAttribute("source", "Some MDX content");
  });
});

describe("Blog Post componentn", () => {
  it("should render post content and front matter correctly", () => {
    const postData: PostData = {
      content: "Mock Content",
      frontMatter: { title: "Mock Title", date: "2024-06-30" },
      slug: "mock slug",
    };
    const { debug } = render(<BlogPost {...postData} />);
    expect(screen.getByText("Mock Title")).toBeInTheDocument();
    expect(
      screen.getByText(formatDateString("2024-06-30")),
    ).toBeInTheDocument();
    expect(screen.getByText("MDX content with components")).toHaveAttribute(
      "source",
      "Mock Content",
    );
  });
});
