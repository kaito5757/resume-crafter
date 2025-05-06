// TODO: Prisma ORMを使ってDBにアクセスする
const resume = [
  {
    id: "dummy_id",
    userId: "dummy_user",
    name: "John Doe",
  },
] as const;

export const resumeRepository = {
  getByUserId: (
    userId: string,
  ): Promise<{ id: string; userId: string; name: string } | null> => {
    return new Promise((resolve) => {
      resolve(resume.find((resume) => resume.userId === userId) ?? null);
    });
  },
};
