import { visit } from "unist-util-visit";
import type { Root } from "mdast";

const URL_RE = /^https?:\/\/\S+$/;

interface OgMeta {
  title: string;
  description: string;
  image: string;
  url: string;
}

async function fetchOgMeta(url: string): Promise<OgMeta> {
  const meta: OgMeta = { title: "", description: "", image: "", url };

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "bot" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { ...meta, title: new URL(url).hostname };

    const html = await res.text();

    const og = (name: string) => {
      const m = html.match(
        new RegExp(`<meta[^>]+property=["']og:${name}["'][^>]+content=["']([^"']+)["']`, "i"),
      ) ?? html.match(
        new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${name}["']`, "i"),
      );
      return m?.[1] ?? "";
    };

    meta.title = og("title") || html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || new URL(url).hostname;
    meta.description = og("description");
    meta.image = og("image");
  } catch {
    meta.title = new URL(url).hostname;
  }

  return meta;
}

interface Task {
  index: number;
  parent: { children: Root["children"] };
  url: string;
}

export default function remarkLinkCard() {
  return async (tree: Root) => {
    const tasks: Task[] = [];

    visit(tree, "paragraph", (node, index, parent) => {
      if (
        index === undefined ||
        !parent ||
        node.children.length !== 1 ||
        node.children[0].type !== "text"
      )
        return;

      const text = node.children[0].value.trim();
      if (!URL_RE.test(text)) return;

      tasks.push({ index, parent: parent as unknown as Task["parent"], url: text });
    });

    const results = await Promise.all(tasks.map((t) => fetchOgMeta(t.url)));

    // Process in reverse order so indices stay valid
    for (let i = tasks.length - 1; i >= 0; i--) {
      const { index, parent, url } = tasks[i];
      const meta = results[i];
      const p = parent;

      const imgHtml = meta.image
        ? `<img class="link-card-image" src="${meta.image}" alt="" />`
        : "";

      const html = `<a class="link-card" href="${url}" target="_blank" rel="noopener noreferrer">${imgHtml}<span class="link-card-body"><span class="link-card-title">${meta.title}</span>${meta.description ? `<span class="link-card-desc">${meta.description}</span>` : ""}<span class="link-card-url">${url}</span></span></a>`;

      p.children.splice(index, 1, { type: "html", value: html } as unknown as Root["children"][0]);
    }
  };
}
