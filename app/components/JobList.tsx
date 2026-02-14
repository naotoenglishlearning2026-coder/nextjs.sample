"use client";

import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: string;
  category?: { id: number; name: string };
  company?: { id: number; name: string };
}

interface Props {
  initialJobs?: Job[];
}

export default function JobList({ initialJobs = [] }: Props) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    if (res.ok) setJobs(await res.json());
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div className="space-y-4 mt-4">
      {jobs.length === 0 ? <p>求人はまだありません</p> :
        jobs.map(job => (
          <div key={job.id} className="border p-4 rounded">
            <h2 className="text-lg font-bold">{job.title}</h2>
            <p>{job.description}</p>
            <p>{job.location} {job.salary ? `| ${job.salary}` : ""}</p>
            <p>カテゴリ: {job.category?.name || "未設定"}</p>
            <p>企業: {job.company?.name || "未設定"}</p>
          </div>
        ))
      }
    </div>
  );
}