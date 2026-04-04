"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";

interface PostMeta {
  slug: string;
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
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);
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
    setSlug("");
    setTitle("");
    setDate(new Date().toISOString().slice(0, 10));
    setDescription("");
    setContent("");
    setIsEdit(false);
  }

  function handleNew() {
    resetEditor();
    setView("editor");
  }

  async function handleEdit(postSlug: string) {
    const res = await fetch(`/api/admin/posts/${postSlug}`);
    if (!res.ok) return;
    const post = await res.json();
    setSlug(post.slug);
    setTitle(post.title);
    setDate(post.date);
    setDescription(post.description);
    setContent(post.content);
    setIsEdit(true);
    setView("editor");
  }

  async function handleDelete(postSlug: string) {
    if (!confirm(`"${postSlug}" 글을 삭제할까요?`)) return;
    await fetch(`/api/admin/posts/${postSlug}`, { method: "DELETE" });
    fetchPosts();
  }

  async function handleSave() {
    if (!slug || !title) return;
    setSaving(true);

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/admin/posts/${slug}` : "/api/admin/posts";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        frontmatter: { title, date, description },
        content,
      }),
    });

    setSaving(false);
    setView("list");
    fetchPosts();
  }

  async function handleImageUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) return;
    const { url } = await res.json();

    // Insert markdown image at cursor
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const before = content.slice(0, start);
      const after = content.slice(start);
      const img = `![${file.name}](${url})`;
      setContent(before + img + after);
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

        <div className="space-y-4 mb-6">
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
              key={post.slug}
              className="flex items-center justify-between border border-border rounded-lg px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-text">{post.title}</p>
                <p className="font-(family-name:--font-mono) text-xs text-border mt-0.5">
                  {post.date} &middot; {post.slug}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post.slug)}
                  className="text-xs text-text-secondary hover:text-teal transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
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
