import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries = posts.map((post) => ({
    url: `https://0dot77.com/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    {
      url: "https://0dot77.com",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://0dot77.com/blog",
      lastModified: posts[0]?.date ?? new Date().toISOString(),
    },
    ...blogEntries,
  ];
}
