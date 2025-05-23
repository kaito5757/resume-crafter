import { protectedProcedure } from "../../handlers/trpc/init";
import { getUserResumeMapper } from "./resumeMapper";
import type { ResumeOutputData } from "./resumeSchema";
import { resumeUseCase } from "./resumeUseCase";

export const resumeRouter = {
  getUserResume: protectedProcedure.query<ResumeOutputData["getUserResume"]>(
    async (opts) => {
      const resume = await resumeUseCase.getResume(opts.ctx.authUser.userId);
      return getUserResumeMapper.toOutputData(resume);
    },
  ),
};
