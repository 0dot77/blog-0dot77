import type { MetadataRoute } from "next";
import { getAllPosts, type Lang } from "@/lib/blog";

const LANGS: Lang[] = ["ko", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: "https://0dot77.com",
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://0dot77.com/blog",
      lastModified: new Date().toISOString(),
    },
  ];

  for (const lang of LANGS) {
    const posts = getAllPosts(lang);
    for (const post of posts) {
      entries.push({
        url: `https://0dot77.com/blog/${lang}/${post.slug}`,
        lastModified: post.date,
      });
    }
  }

  return entries;
}
