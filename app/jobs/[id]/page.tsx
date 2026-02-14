"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Job = {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: string;
  company: { name: string };
  category?: { name: string };
};

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  // 編集フォーム用 state
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`/api/jobs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
        // 初期値をフォームに設定
        setTitle(data.title);
        setDescription(data.description);
        setLocation(data.location);
        setSalary(data.salary || "");
      } else {
        setJob(null);
      }
      setLoading(false);
    }
    fetchJob();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!job) return <p>Job not found</p>;

  // 編集保存
  const handleSave = async () => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, location, salary }),
    });
    if (res.ok) {
      const updated = await res.json();
      setJob(updated);
      setEditing(false);
      alert("Updated successfully");
    } else {
      alert("Update failed");
    }
  };

  // 削除
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Deleted successfully");
      router.push("/jobs"); // 一覧に戻る
    } else {
      alert("Delete failed");
    }
  };

  return (
    <main style={{ padding: 24 }}>
      {editing ? (
        <>
          <h1>Edit Job</h1>
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Salary"
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h1>{job.title}</h1>
          <p><strong>Company:</strong> {job.company.name}</p>
          <p><strong>Category:</strong> {job.category?.name || "None"}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary || "Not specified"}</p>
          <p><strong>Description:</strong> {job.description}</p>

          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </main>
  );
}