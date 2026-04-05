"use client";

import GiscusWidget from "@giscus/react";

interface GiscusProps {
  lang?: "ko" | "en";
}

export default function Giscus({ lang = "ko" }: GiscusProps) {
  return (
    <GiscusWidget
      repo="0dot77/blog-0dot77"
      repoId="R_kgDOQxeHUA"
      category="Blog Comments"
      categoryId="DIC_kwDOQxeHUM4C6HJE"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="transparent_dark"
      lang={lang}
      loading="lazy"
    />
  );
}
