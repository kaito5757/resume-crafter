import { getUserResumeMapper } from "../features/resume/resumeMapper";
import type { ResumeOutputData } from "../features/resume/resumeSchema";
import { resumeUseCase } from "../features/resume/resumeUseCase";
import { protectedProcedure } from "./trpc/init";

export const resumeRouter = {
  getUserResume: protectedProcedure.query<ResumeOutputData["getUserResume"]>(
    async (opts) => {
      const resume = await resumeUseCase.getResume(opts.ctx.authUser.userId);
      return getUserResumeMapper.toOutputData(resume);
    },
  ),
};
