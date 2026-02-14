"use client";

import { useState } from "react";

type Props = {
  onAdd: () => void; // 追加後に親に通知
};

export default function AddForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title) return;

    setLoading(true);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        location,
        salary,
        companyId,
        categoryId,
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
      setLocation("");
      setSalary("");
      setCompanyId("");
      setCategoryId("");

      onAdd();
    } else {
      alert("Error adding job");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        placeholder="salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <input
        placeholder="companyId"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />

      <input
        placeholder="categoryId"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        Add job
      </button>
    </form>
  );
}