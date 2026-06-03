"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const EMBED_SCRIPT = "https://www.instagram.com/embed.js";

export function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    const process = () => window.instgrm?.Embeds.process();
    if (window.instgrm) {
      process();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT}"]`,
    );
    if (existing) {
      existing.addEventListener("load", process);
      process();
      return () => existing.removeEventListener("load", process);
    }
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT;
    script.async = true;
    script.addEventListener("load", process);
    document.body.appendChild(script);
    return () => script.removeEventListener("load", process);
  }, []);

  return (
    <blockquote
      className="instagram-media w-full !m-0"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ minHeight: 320 }}
    >
      <a href={url} target="_blank" rel="noreferrer">
        Instagram에서 보기
      </a>
    </blockquote>
  );
}
