"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const id = Number(params.id);

  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`/api/jobs/${id}?id=${id}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
      }
    }
    fetchJob();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1>{job.title}</h1>
      <p>
        <strong>Company:</strong> {job.company.name}
      </p>
      <p>
        <strong>Category:</strong> {job.category?.name || "なし"}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Salary:</strong> {job.salary || "なし"}
      </p>
      <p>
        <strong>Description:</strong> {job.description}
      </p>
    </main>
  );
}