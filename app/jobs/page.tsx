"use client";

import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  company: {
    name: string;
  };
};

export default function JobsPage() {
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
      <h1>Jobs</h1>

      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.title} / {job.company.name}
          </li>
        ))}
      </ul>
    </main>
  );
}