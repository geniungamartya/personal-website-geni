import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./nav";
import "@testing-library/jest-dom/vitest";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

describe("Navbar", () => {
  beforeEach(() => {
    const router = createRouter({ routeTree });
    render(<RouterProvider router={router} defaultComponent={Navbar} />);
  });
  it("renders all navigation items", () => {
    // Check that each navigation item is rendered with the correct text
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("blog")).toBeInTheDocument();
    expect(screen.getByText("playground")).toBeInTheDocument();
  });

  it("renders links with correct href attributes", () => {
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
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it("renders blog link", () => {
    const blogLink = screen.getByRole("link", { name: /blog/i });
    expect(blogLink).toBeInTheDocument();
  });

  it("home link has correct href", () => {
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("blog link has correct href", () => {
    const blogLink = screen.getByRole("link", { name: /blog/i });
    expect(blogLink).toHaveAttribute("href", "/blog");
  });
});
