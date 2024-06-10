import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

async function getPosts() {
  const postsDirectory = "./app/blog/posts";
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      data: data,
      slug: filename.replace(/\.mdx?$/, ""),
    };
  });

  console.log(posts)
  return posts;
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      {/* <h1>My Blog</h1> */}
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.data.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
