import { prisma } from "@/lib/prisma";

export async function GET() {
  const companies = await prisma.user.findMany({
    where: { role: "company" },
  });
  return new Response(JSON.stringify(companies), { status: 200 });
}