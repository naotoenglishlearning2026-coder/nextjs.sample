import { prisma } from "@/lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  const id = parseInt(context.params.id, 10);
  if (isNaN(id)) return new Response("Invalid job ID", { status: 400 });

  const job = await prisma.job.findUnique({
    where: { id },
    include: { company: true, category: true },
  });

  if (!job) return new Response("Job not found", { status: 404 });
  return new Response(JSON.stringify(job), { status: 200 });
}

// 更新
export async function PATCH(req: Request, context: { params: { id: string } }) {
  const id = parseInt(context.params.id, 10);
  if (isNaN(id)) return new Response("Invalid job ID", { status: 400 });

  const { title, description, location, salary } = await req.json();
  const updated = await prisma.job.update({
    where: { id },
    data: { title, description, location, salary },
  });
  return new Response(JSON.stringify(updated), { status: 200 });
}

// 削除
export async function DELETE(req: Request, context: { params: { id: string } }) {
  const id = parseInt(context.params.id, 10);
  if (isNaN(id)) return new Response("Invalid job ID", { status: 400 });

  await prisma.job.delete({ where: { id } });
  return new Response("Deleted", { status: 200 });
}