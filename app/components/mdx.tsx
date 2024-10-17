import React from "react";
import { highlight } from "sugar-high";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PostData } from "../service/blogService";
import { formatDateString } from "../utils";

export function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
}

export function Code({ children, ...props }: CodeProps): JSX.Element {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

export function createHeading(level: number) {
  const Heading = ({ children }: { children: string }): JSX.Element => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  code: Code,
};

export function CustomMDX(props: any): JSX.Element {
  return <MDXRemote {...props} components={components} />;
}

export function BlogPost(post: PostData): JSX.Element {
  const { content, frontMatter } = post;
  const title = frontMatter.title;
  const date = formatDateString(frontMatter.date);

  return (
    <div>
      <h1 className="title font-semibold text-2xl tracking-tighter">{title}</h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{date}</p>
      </div>
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </div>
  );
}
