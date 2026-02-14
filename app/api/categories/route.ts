import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({ include: { jobs: true } });
  return new Response(JSON.stringify(categories), { status: 200 });
}