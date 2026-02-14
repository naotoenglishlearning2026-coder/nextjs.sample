"use client";

import { useState } from "react";

export default function AddForm() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title) return;

    setLoading(true);

    await fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    setLoading(false);

    // 再読み込みして最新データ取得
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What did you study?"
      />

      <button type="submit" disabled={loading}>
        Add
      </button>
    </form>
  );
}