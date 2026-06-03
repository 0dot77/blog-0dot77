import Link from "next/link";
import { getAllItems, type CollectionItem } from "@/lib/collection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection — 0dot77",
  description: "Media tech tools and resources curated by Taeyang Yoo",
};

const platformLabels: Record<CollectionItem["platform"], string> = {
  instagram: "Instagram",
  x: "X",
  other: "Link",
};

const platformStyles: Record<CollectionItem["platform"], string> = {
  instagram: "text-[#E1306C] border-[#E1306C]/30 bg-[#E1306C]/10",
  x: "text-text border-border bg-surface",
  other: "text-text-secondary border-border bg-surface",
};

export default async function CollectionPage() {
  const items = await getAllItems();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
      <header className="mb-16">
        <div className="flex items-baseline justify-between">
          <h1 className="font-(family-name:--font-mono) text-2xl font-bold text-text mb-3">
            Collection
          </h1>
          <Link
            href="/"
            className="font-(family-name:--font-mono) text-xs text-text-secondary hover:text-teal transition-colors"
          >
            &larr; Home
          </Link>
        </div>
        <p className="font-(family-name:--font-mono) text-sm text-text-secondary leading-relaxed">
          Curated links from around the web.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="border border-dashed border-border rounded-lg px-10 py-20 text-center">
          <p className="font-(family-name:--font-mono) text-sm text-text-secondary">
            No items yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-surface border border-border rounded-lg p-4 hover:border-teal/30 transition-colors group"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`inline-block font-(family-name:--font-mono) text-[10px] px-1.5 py-0.5 rounded border ${platformStyles[item.platform]}`}
                >
                  {platformLabels[item.platform]}
                </span>
                <span className="font-(family-name:--font-mono) text-[10px] text-border shrink-0">
                  {item.date}
                </span>
              </div>
              <h2 className="text-sm font-medium text-text group-hover:text-teal transition-colors mb-1">
                {item.title}
              </h2>
              {item.description && (
                <p className="text-xs text-text-secondary leading-relaxed mb-2">
                  {item.description}
                </p>
              )}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-(family-name:--font-mono) text-[10px] text-text-secondary bg-bg px-1.5 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
