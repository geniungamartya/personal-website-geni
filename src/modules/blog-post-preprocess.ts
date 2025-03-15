export interface PostData {
  title: string;
  date: string;
  content: string;
  slug: string;
}

export interface Post {
  slug: string;
  data: PostData;
}

export function processPosts(posts: PostData[]): Post[] {
  const postData = posts.map((post) => ({
    data: post,
    slug: slugify(post.title),
  }));

  const sortedPosts = postData.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);
    return dateB.getTime() - dateA.getTime();
  });

  return sortedPosts;
}

export function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}
