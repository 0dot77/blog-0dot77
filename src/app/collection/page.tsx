import Link from "next/link";
import { getAllItems } from "@/lib/collection";
import CollectionCard from "@/components/collection-card";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Collection — 0dot77",
  description: "Media tech tools and resources curated by Taeyang Yoo",
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
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
