import { NextResponse } from "next/server";

type Log = {
  id: number;
  title: string;
};

let logs: Log[] = [
  { id: 1, title: "Learn Next.js basics" }
];

export async function GET() {
  return NextResponse.json(logs);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newLog: Log = {
    id: Date.now(),
    title: body.title,
  };

  logs.push(newLog);

  return NextResponse.json(newLog, { status: 201 });
}