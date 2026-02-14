"use client";

import { useState } from "react";

interface Props {
  companyId: number;
  categories: { id: number; name: string }[];
  onJobAdded?: () => void; // 追加後にリスト更新
}

export default function AddJobForm({ companyId, categories, onJobAdded }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>(categories[0]?.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !location) return;

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, location, salary, companyId, categoryId }),
    });

    if (res.ok) {
      setTitle(""); setDescription(""); setLocation(""); setSalary(""); setCategoryId(categories[0]?.id);
      if (onJobAdded) onJobAdded(); // リスト更新
      alert("求人を追加しました！");
    } else {
      alert("求人追加に失敗しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      <input placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-1 w-full" required />
      <textarea placeholder="仕事内容" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-1 w-full" required />
      <input placeholder="勤務地" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-1 w-full" required />
      <input placeholder="給与" value={salary} onChange={(e) => setSalary(e.target.value)} className="border p-1 w-full" />
      <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} className="border p-1 w-full">
        {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">求人を追加</button>
    </form>
  );
}