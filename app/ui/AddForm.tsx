"use client";

import { useState } from "react";

type Props = {
  onAdd: () => void;
};

export default function AddForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [companyId, setCompanyId] = useState(""); // 会社IDを入力
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !companyId) return alert("タイトルと会社IDは必須です");

    setLoading(true);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        location,
        salary,
        companyId: Number(companyId), // numberに変換
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setCompanyId("");
      onAdd(); // 親ページに再フェッチを促す
    } else {
      alert("Error adding job");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job Title"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />
      <input
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
      />
      <input
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
        placeholder="Company ID"
      />
      <button type="submit" disabled={loading}>
        Add
      </button>
    </form>
  );
}
