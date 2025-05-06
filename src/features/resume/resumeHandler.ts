import { baseProcedure } from "../../trpc/init";
import { getUserResumeMapper } from "./resumeMapper";
import type { ResumeOutputData } from "./resumeSchema";
import { resumeUseCase } from "./resumeUseCase";

export const resumeRouter = {
  getUserResume: baseProcedure.query<ResumeOutputData["getUserResume"]>(
    async (opts) => {
      const resume = await resumeUseCase.getResume(opts.ctx.userId);
      return getUserResumeMapper.toOutputData(resume);
    },
  ),
};
