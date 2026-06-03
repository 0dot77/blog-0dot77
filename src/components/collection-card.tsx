"use client";

import { useState } from "react";
import type { CollectionItem } from "@/lib/collection";

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

export default function CollectionCard({ item }: { item: CollectionItem }) {
  const [imgError, setImgError] = useState(false);

  const showImage = item.thumbnail && !imgError;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-surface border border-border rounded-lg overflow-hidden hover:border-teal/30 transition-colors group"
    >
      {showImage ? (
        <div className="aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.thumbnail}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-bg flex items-center justify-center">
          <span className="font-(family-name:--font-mono) text-[10px] text-border">
            {platformLabels[item.platform]}
          </span>
        </div>
      )}
      <div className="p-4">
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
      </div>
    </a>
  );
}
