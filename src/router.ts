import { resumeRouter } from "./features/resume/resumeHandler";
import { createTRPCRouter } from "./handlers/trpc/init";

export const appRouter = createTRPCRouter({
  ...resumeRouter,
});

export type AppRouter = typeof appRouter;
