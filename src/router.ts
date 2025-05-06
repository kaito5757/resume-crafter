import { resumeRouter } from "./features/resume/resumeHandler";
import { createTRPCRouter } from "./trpc/init";

export const appRouter = createTRPCRouter({
  ...resumeRouter,
});

export type AppRouter = typeof appRouter;
