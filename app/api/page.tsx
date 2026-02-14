import AddForm from "./ui/AddForm";

type Log = {
  id: number;
  title: string;
};

async function getLogs(): Promise<Log[]> {
  // 相対パスに変更してVercelでも動作
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/logs`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch logs");
  return res.json();
}

export default async function Page() {
  let logs: Log[] = [];

  try {
    logs = await getLogs();
  } catch (err) {
    console.error(err);
  }

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
