"use client";

import { useEffect, useState } from "react";

type Props = {
  onAdd: () => void;
};

type Category = {
  id: number;
  name: string;
};

type Company = {
  id: number;
  name: string;
};

export default function AddForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [companyId, setCompanyId] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);

  // カテゴリと会社一覧を取得
  useEffect(() => {
    async function fetchData() {
      const [catRes, compRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/companies"), // ← 後でAPI作成
      ]);
      const [catData, compData] = await Promise.all([
        catRes.json(),
        compRes.json(),
      ]);
      setCategories(catData);
      setCompanies(compData);
    }
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || companyId === "") {
      return alert("タイトルと会社は必須です");
    }

    setLoading(true);

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        location,
        salary,
        companyId: Number(companyId),
        categoryId: categoryId === "" ? null : Number(categoryId),
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

      {/* 会社プルダウン */}
      <select
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value === "" ? "" : Number(e.target.value))}
        required
      >
        <option value="">Select company</option>
        {companies.map((comp) => (
          <option key={comp.id} value={comp.id}>
            {comp.name}
          </option>
        ))}
      </select>

      {/* カテゴリプルダウン */}
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value === "" ? "" : Number(e.target.value))}
      >
        <option value="">No category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        Add
      </button>
    </form>
  );
}