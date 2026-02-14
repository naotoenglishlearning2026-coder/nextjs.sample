import AddJobForm from "@/app/components/AddJobForm";
import JobList from "@/app/components/JobList";
import { prisma } from "@/lib/prisma";

export default async function JobsPage() {
  const categories = await prisma.category.findMany();
  const initialJobs = await prisma.job.findMany({
    orderBy: { id: "desc" },
    include: { category: true, company: true },
  });

  const companyId = 1; // 企業ユーザーID（仮）

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">求人一覧</h1>

      <AddJobForm companyId={companyId} categories={categories} onJobAdded={() => window.location.reload()} />

      <JobList initialJobs={initialJobs} />
    </div>
  );
}