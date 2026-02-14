"use client";
import React, { useState, useEffect } from "react";
import AddForm from "./ui/AddForm";

type Log = { id: number; title: string };

export default function Page() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const res = await fetch("/api/logs");
      const data = await res.json();
      setLogs(data);
    }
    fetchLogs();
  }, []);

  const handleAdd = async () => {
    const res = await fetch("/api/logs");
    const data = await res.json();
    setLogs(data);
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Study Log</h1>
      <AddForm onAdd={handleAdd} />
      <ul>
        {logs.map((log) => (
          <li key={log.id}>{log.title}</li>
        ))}
      </ul>
    </main>
  );
}
