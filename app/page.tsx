import AddForm from "./ui/AddForm";

type Log = { id: number; title: string };

async function getLogs(): Promise<Log[]> {
  try {
    // 相対パスで fetch
    const res = await fetch("/api/logs", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch logs");
    return res.json();
  } catch (err) {
    console.error("Error fetching logs:", err);
    return []; // エラーでも空配列
  }
}

export default async function Page() {
  const logs = await getLogs();

  return (
    <main style={{ padding: 24 }}>
      <h1>Study Log</h1>
      <AddForm />
      <ul>
        {logs.map((log) => (
          <li key={log.id}>{log.title}</li>
        ))}
      </ul>
    </main>
  );
}
