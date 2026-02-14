import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { id: "desc" },
    include: { category: true, company: true },
  });
  return new Response(JSON.stringify(jobs), { status: 200 });
}

export async function POST(req: Request) {
  const { title, description, location, salary, companyId, categoryId } =
    await req.json();
  const job = await prisma.job.create({
    data: { title, description, location, salary, companyId, categoryId },
  });
  return new Response(JSON.stringify(job), { status: 201 });
}
