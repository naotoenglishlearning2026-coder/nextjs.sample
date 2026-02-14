import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.job.findMany({
    include: { company: true, category: true },
    orderBy: { id: "desc" },
  });
  return new Response(JSON.stringify(jobs), { status: 200 });
}