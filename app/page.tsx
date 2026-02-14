import AddForm from "./ui/AddForm";

type Log = {
  id: number;
  title: string;
};

async function getLogs(): Promise<Log[]> {
  const res = await fetch("http://localhost:3000/api/logs", {
    cache: "no-store",
  });

  return res.json();
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
