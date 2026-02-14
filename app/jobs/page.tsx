"use client";

import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: { name: string };
  category?: { id: number; name: string };
};

type Category = {
  id: number;
  name: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "">("");

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch("/api/jobs", { cache: "no-store" });
      const data = await res.json();
      setJobs(data);
    }
    fetchJobs();

    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  // 選択したカテゴリでフィルター
  const filteredJobs =
    selectedCategory === ""
      ? jobs
      : jobs.filter((job) => job.category?.id === selectedCategory);

  return (
    <main style={{ padding: 24 }}>
      <h1>Jobs</h1>

      <label>
        Filter by category:{" "}
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      <ul>
        {filteredJobs.map((job) => (
          <li key={job.id}>
            {job.title} / {job.company.name} / {job.category?.name || "なし"}
          </li>
        ))}
      </ul>
    </main>
  );
}