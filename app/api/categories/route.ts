import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany();
  return new Response(JSON.stringify(categories), { status: 200 });
}