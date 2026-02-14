import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId, jobId } = await req.json();
  const application = await prisma.application.create({
    data: { userId, jobId },
  });
  return new Response(JSON.stringify(application), { status: 201 });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const applications = await prisma.application.findMany({
    where: { userId: userId ? Number(userId) : undefined },
    include: { job: true },
  });
  return new Response(JSON.stringify(applications), { status: 200 });
}