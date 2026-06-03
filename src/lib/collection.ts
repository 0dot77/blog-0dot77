import { getFileContent, createOrUpdateFile } from "./github";

const COLLECTION_PATH = "content/collection/index.json";

export interface CollectionItem {
  id: string;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  tags: string[];
  platform: "instagram" | "x" | "other";
  date: string;
}

export function detectPlatform(url: string): "instagram" | "x" | "other" {
  if (/instagram\.com/.test(url)) return "instagram";
  if (/x\.com|twitter\.com/.test(url)) return "x";
  return "other";
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export async function fetchOgMeta(url: string): Promise<{ title: string | null; image: string | null }> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "bot" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { title: null, image: null };
    const html = await res.text();

    const og = (name: string) => {
      const m =
        html.match(
          new RegExp(`<meta[^>]+property=["']og:${name}["'][^>]+content=["']([^"']+)["']`, "i"),
        ) ??
        html.match(
          new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${name}["']`, "i"),
        );
      return m?.[1] ?? null;
    };

    const title = og("title") ?? html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? null;
    const image = og("image");

    return { title, image };
  } catch {
    return { title: null, image: null };
  }
}

export async function getAllItems(): Promise<CollectionItem[]> {
  try {
    const raw = await getFileContent(COLLECTION_PATH);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addItem(
  item: Omit<CollectionItem, "id" | "date" | "platform"> & { url: string },
): Promise<CollectionItem> {
  const items = await getAllItems();
  const newItem: CollectionItem = {
    id: generateId(),
    title: item.title,
    url: item.url,
    description: item.description,
    thumbnail: item.thumbnail,
    tags: item.tags,
    platform: detectPlatform(item.url),
    date: new Date().toISOString().slice(0, 10),
  };
  items.push(newItem);
  await createOrUpdateFile(
    COLLECTION_PATH,
    JSON.stringify(items, null, 2),
    `Add collection item: ${newItem.title}`,
  );
  return newItem;
}

export async function updateItem(
  id: string,
  updates: Partial<Omit<CollectionItem, "id">>,
): Promise<CollectionItem | null> {
  const items = await getAllItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;

  items[idx] = { ...items[idx], ...updates, id: items[idx].id };
  if (updates.url) {
    items[idx].platform = detectPlatform(updates.url);
  }

  await createOrUpdateFile(
    COLLECTION_PATH,
    JSON.stringify(items, null, 2),
    `Update collection item: ${items[idx].title}`,
  );
  return items[idx];
}

export async function deleteItem(id: string): Promise<void> {
  const items = await getAllItems();
  const filtered = items.filter((i) => i.id !== id);
  const deleted = items.find((i) => i.id === id);
  await createOrUpdateFile(
    COLLECTION_PATH,
    JSON.stringify(filtered, null, 2),
    `Delete collection item: ${deleted?.title ?? id}`,
  );
}
