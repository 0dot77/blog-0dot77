"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { marked, type TokenizerExtension, type RendererExtension } from "marked";

const markExtension: TokenizerExtension & RendererExtension = {
  name: "mark",
  level: "inline",
  start(src: string) { return src.indexOf("=="); },
  tokenizer(src: string) {
    const match = src.match(/^==(.+?)==/);
    if (match) {
      return { type: "mark", raw: match[0], text: match[1] };
    }
  },
  renderer(token) {
    return `<mark>${token.text}</mark>`;
  },
};

marked.use({ extensions: [markExtension] });

type Lang = "ko" | "en";

interface PostMeta {
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  description: string;
}

type View = "list" | "editor";

export default function AdminPage() {
  const router = useRouter();
  const [view, setView] = useState<View>("list");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor state
  const [lang, setLang] = useState<Lang>("ko");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const previewHtml = useMemo(() => {
    return marked.parse(content || "", { async: false }) as string;
  }, [content]);

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/admin/posts");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function resetEditor() {
    setLang("ko");
    setSlug("");
    setTitle("");
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
    setContent("");
    setIsEdit(false);
    setError("");
  }

  function handleNew() {
    resetEditor();
    setView("editor");
  }

  async function handleEdit(postSlug: string, postLang: Lang) {
    const res = await fetch(`/api/admin/posts/${postSlug}?lang=${postLang}`);
    if (!res.ok) return;
    const post = await res.json();
    setLang(postLang);
    setSlug(post.slug);
    setTitle(post.title);
    setDate(post.date);
    setDescription(post.description);
    setContent(post.content);
    setIsEdit(true);
    setView("editor");
  }

  async function handleDelete(postSlug: string, postLang: Lang) {
    if (!confirm(`"${postSlug}" (${postLang}) 글을 삭제할까요?`)) return;
    await fetch(`/api/admin/posts/${postSlug}?lang=${postLang}`, { method: "DELETE" });
    fetchPosts();
  }

  async function handleSave() {
    if (!slug || !title) return;
    setSaving(true);
    setError("");

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/admin/posts/${slug}` : "/api/admin/posts";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          lang,
          frontmatter: { title, date, description },
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `저장 실패 (${res.status})`);
        setSaving(false);
        return;
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
      setSaving(false);
      return;
    }

    setSaving(false);
    setView("list");
    fetchPosts();
  }

  async function handleImageUpload(file: File) {
    const placeholder = `![업로드 중... ${file.name}]()`;
    const textarea = textareaRef.current;
    const cursorPos = textarea?.selectionStart ?? 0;

    // Insert placeholder at cursor
    setContent((prev) => {
      const before = prev.slice(0, cursorPos);
      const after = prev.slice(cursorPos);
      return before + placeholder + after;
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "이미지 업로드 실패");
        setContent((prev) => prev.replace(placeholder, ""));
        return;
      }

      const { url } = await res.json();
      const img = `![${file.name}](${url})`;
      setContent((prev) => prev.replace(placeholder, img));
    } catch {
      setError("이미지 업로드 중 네트워크 오류");
      setContent((prev) => prev.replace(placeholder, ""));
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) handleImageUpload(file);
      }
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32">
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (view === "editor") {
    return (
      <div className="max-w-[90rem] mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setView("list")}
            className="font-(family-name:--font-mono) text-xs text-text-secondary hover:text-teal transition-colors"
          >
            &larr; Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !slug || !title}
            className="bg-teal/10 border border-teal/30 text-teal rounded-lg px-4 py-2 text-sm font-(family-name:--font-mono) hover:bg-teal/20 transition-colors disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save & Deploy"}
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm text-red-400 font-(family-name:--font-mono)">
            {error}
          </div>
        )}

        <div className="space-y-4 mb-6">
          <div className="flex gap-1 font-(family-name:--font-mono) text-xs border border-border rounded-lg overflow-hidden w-fit">
            <button
              onClick={() => setLang("ko")}
              className={`px-3 py-1.5 transition-colors ${lang === "ko" ? "bg-teal/20 text-teal" : "text-text-secondary hover:text-text"}`}
            >
              KR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-teal/20 text-teal" : "text-text-secondary hover:text-text"}`}
            >
              EN
            </button>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-text text-lg font-medium placeholder:text-text-secondary focus:outline-none focus:border-teal"
          />
          <div className="flex gap-3">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="slug-url"
              disabled={isEdit}
              className="flex-1 bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text font-(family-name:--font-mono) placeholder:text-text-secondary focus:outline-none focus:border-teal disabled:opacity-50"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text font-(family-name:--font-mono) focus:outline-none focus:border-teal"
            />
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Short description"
            className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-teal"
          />
        </div>

        <div className="flex gap-4 h-[60vh]">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onDrop={handleDrop}
            onPaste={handlePaste}
            onDragOver={(e) => e.preventDefault()}
            placeholder="Write markdown here... (drag & drop or paste images)"
            className="w-1/2 bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text font-(family-name:--font-mono) leading-relaxed placeholder:text-text-secondary focus:outline-none focus:border-teal resize-none"
          />
          <div
            className="w-1/2 bg-surface border border-border rounded-lg px-6 py-4 overflow-y-auto prose"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
      <header className="flex items-center justify-between mb-12">
        <div>
          <Link
            href="/"
            className="font-(family-name:--font-mono) text-xs text-text-secondary hover:text-teal transition-colors"
          >
            &larr; Home
          </Link>
          <h1 className="font-(family-name:--font-mono) text-xl font-bold text-text mt-4">
            // admin
          </h1>
        </div>
        <button
          onClick={handleNew}
          className="bg-teal/10 border border-teal/30 text-teal rounded-lg px-4 py-2 text-sm font-(family-name:--font-mono) hover:bg-teal/20 transition-colors"
        >
          + New Post
        </button>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-text-secondary">아직 글이 없습니다.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={`${post.lang}-${post.slug}`}
              className="flex items-center justify-between border border-border rounded-lg px-4 py-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-(family-name:--font-mono) text-[10px] px-1.5 py-0.5 rounded border border-border text-text-secondary">
                    {post.lang === "ko" ? "KR" : "EN"}
                  </span>
                  <p className="text-sm font-medium text-text">{post.title}</p>
                </div>
                <p className="font-(family-name:--font-mono) text-xs text-border mt-0.5">
                  {post.date} &middot; {post.slug}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post.slug, post.lang)}
                  className="text-xs text-text-secondary hover:text-teal transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.slug, post.lang)}
                  className="text-xs text-text-secondary hover:text-red-400 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
