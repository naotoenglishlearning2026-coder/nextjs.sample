"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  company: { name: string };
  category?: { name: string };
  location: string;
};

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      setJobs(data);
    }
    fetchJobs();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Job Listings</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} style={{ marginBottom: 12 }}>
            <Link href={`/jobs/${job.id}`}>
              <strong>{job.title}</strong> - {job.company.name} (
              {job.category?.name || "No category"}) - {job.location}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}