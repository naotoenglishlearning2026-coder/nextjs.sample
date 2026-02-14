"use client";

import { useState } from "react";

type Props = {
  onAdd: () => void; // ログ追加後に親ページに通知
};

export default function AddForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;

    setLoading(true);

    const res = await fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      setTitle("");
      onAdd(); // 親ページに再フェッチを促す
    } else {
      alert("Error adding log");
    }

    setLoading(false);
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
