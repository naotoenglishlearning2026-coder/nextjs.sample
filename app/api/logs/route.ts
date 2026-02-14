import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const logs = await prisma.log.findMany({ orderBy: { createdAt: "desc" } });
  return new Response(JSON.stringify(logs), { status: 200 });
}

export async function POST(req: Request) {
  const { title } = await req.json();
  const log = await prisma.log.create({ data: { title } });
  return new Response(JSON.stringify(log), { status: 201 });
}