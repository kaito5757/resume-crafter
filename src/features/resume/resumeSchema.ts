import { z } from "zod";

export const resumeInputData = {};

const resumeOutputData = {
  getUserResume: z.object({
    userId: z.string(),
  }),
};

export type ResumeOutputData = {
  getUserResume: z.infer<typeof resumeOutputData.getUserResume>;
};
