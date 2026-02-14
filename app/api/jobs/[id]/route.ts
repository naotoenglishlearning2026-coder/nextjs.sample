import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) return new Response("Invalid ID", { status: 400 });

  const job = await prisma.job.findUnique({
    where: { id },
    include: { company: true, category: true },
  });

  if (!job) return new Response("Job not found", { status: 404 });

  return new Response(JSON.stringify(job), { status: 200 });
}