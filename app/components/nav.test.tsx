import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // This adds the custom matchers provided by jest-dom
import { Navbar } from "./nav";

describe("Navbar", () => {
  it("renders all navigation items", () => {
    render(<Navbar />);
    // Check that each navigation item is rendered with the correct text
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("blog")).toBeInTheDocument();
    expect(screen.getByText("playground")).toBeInTheDocument();
  });

  it("renders links with correct href attributes", () => {
    // Render the Navbar component
    render(<Navbar />);

    // Check that each link has the correct href attribute
    expect(screen.getByText("home").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("blog").closest("a")).toHaveAttribute(
      "href",
      "/blog",
    );
    expect(screen.getByText("playground").closest("a")).toHaveAttribute(
      "href",
      "/playground",
    );
  });

  it("renders home link", () => {
    render(<Navbar />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it("renders blog link", () => {
    render(<Navbar />);
    const blogLink = screen.getByRole("link", { name: /blog/i });
    expect(blogLink).toBeInTheDocument();
  });

  it("home link has correct href", () => {
    render(<Navbar />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("blog link has correct href", () => {
    render(<Navbar />);
    const blogLink = screen.getByRole("link", { name: /blog/i });
    expect(blogLink).toHaveAttribute("href", "/blog");
  });
});
