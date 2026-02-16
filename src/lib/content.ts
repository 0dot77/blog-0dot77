import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  coverImage: string;
  youtubeUrl?: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function extractYoutubeUrl(content: string): string | undefined {
  const match = content.match(
    /https?:\/\/(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch\?v=)([\w-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : undefined;
}

function transformYoutubeLinks(htmlContent: string): string {
  return htmlContent.replace(
    /<a[^>]*href="(https?:\/\/(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch\?v=)([\w-]+)[^"]*)"[^>]*>[^<]*<\/a>/g,
    (_match, _url, videoId) =>
      `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen loading="lazy"></iframe></div>`
  );
}

function getPostsFromDir(
  dirName: string,
  type: "lab" | "sprint" | "blog"
): PostMeta[] {
  const dir = path.join(contentDir, dirName);
  if (!fs.existsSync(dir)) return [];

  const folders = fs.readdirSync(dir).filter((f) => {
    const fullPath = path.join(dir, f);
    return fs.statSync(fullPath).isDirectory();
  });

  const posts: PostMeta[] = [];

  for (const folder of folders) {
    const indexPath = path.join(dir, folder, "index.md");
    if (!fs.existsSync(indexPath)) continue;

    const fileContent = fs.readFileSync(indexPath, "utf-8");
    const { data } = matter(fileContent);

    let coverImage = "";
    if (data.cover?.image) {
      coverImage = `/content/${dirName}/${folder}/${data.cover.image}`;
    }

    let slug = folder;
    if (type === "lab") {
      const match = folder.match(/(\d+)$/);
      slug = match ? match[1] : folder;
    } else if (type === "sprint") {
      const match = folder.match(/(\d+)$/);
      slug = match ? match[1] : folder;
    }

    posts.push({
      slug,
      title: data.title || folder,
      date: data.date
        ? new Date(data.date).toISOString().split("T")[0]
        : "2025-01-01",
      tags: data.tags || [],
      summary: data.summary || "",
      coverImage,
      youtubeUrl: extractYoutubeUrl(fileContent),
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getLabPosts(): PostMeta[] {
  return getPostsFromDir("daily", "lab");
}

export function getSprintPosts(): PostMeta[] {
  return getPostsFromDir("sprint", "sprint");
}

export function getBlogPosts(): PostMeta[] {
  return getPostsFromDir("blog", "blog");
}

async function getPostBySlug(
  dirName: string,
  folderPrefix: string,
  slug: string
): Promise<Post | null> {
  const dir = path.join(contentDir, dirName);
  if (!fs.existsSync(dir)) return null;

  const decodedSlug = decodeURIComponent(slug);
  const folders = fs.readdirSync(dir);
  const folder = folders.find((f) => {
    if (folderPrefix) {
      return f.endsWith(decodedSlug) || f === decodedSlug;
    }
    return f === decodedSlug;
  });

  if (!folder) return null;

  const indexPath = path.join(dir, folder, "index.md");
  if (!fs.existsSync(indexPath)) return null;

  const fileContent = fs.readFileSync(indexPath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html, { sanitize: false }).process(content);
  let contentHtml = transformYoutubeLinks(processedContent.toString());

  contentHtml = contentHtml.replace(
    /src="(?!http)(.*?)"/g,
    `src="/content/${dirName}/${folder}/$1"`
  );

  let coverImage = "";
  if (data.cover?.image) {
    coverImage = `/content/${dirName}/${folder}/${data.cover.image}`;
  }

  return {
    slug,
    title: data.title || folder,
    date: data.date
      ? new Date(data.date).toISOString().split("T")[0]
      : "2025-01-01",
    tags: data.tags || [],
    summary: data.summary || "",
    coverImage,
    youtubeUrl: extractYoutubeUrl(fileContent),
    contentHtml,
  };
}

export async function getLabPost(slug: string): Promise<Post | null> {
  return getPostBySlug("daily", "daily-immersive---", slug);
}

export async function getSprintPost(slug: string): Promise<Post | null> {
  return getPostBySlug("sprint", "sprint-", slug);
}

export async function getBlogPost(slug: string): Promise<Post | null> {
  return getPostBySlug("blog", "", slug);
}

export async function getAboutContent(): Promise<{ title: string; contentHtml: string }> {
  const filePath = path.join(contentDir, "about.md");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processedContent = await remark().use(html, { sanitize: false }).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title || "About",
    contentHtml,
  };
}

export function getAllTags(): string[] {
  const allPosts = [...getLabPosts(), ...getSprintPosts(), ...getBlogPosts()];
  const tagSet = new Set<string>();
  allPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
