"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-32">
      <h1 className="font-(family-name:--font-mono) text-xl font-bold text-text mb-8">
        // admin
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-teal"
          autoFocus
        />
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-teal/10 border border-teal/30 text-teal rounded-lg px-4 py-2.5 text-sm font-(family-name:--font-mono) hover:bg-teal/20 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
