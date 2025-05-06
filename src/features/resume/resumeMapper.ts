import { UserId } from "../user/domain/userId";
import type { Resume } from "./domain/resume";
import type { ResumeOutputData } from "./resumeSchema";

export const getUserResumeMapper = {
  toDomainFromInputData: (
    userId: string,
  ): {
    userId: UserId;
  } => {
    return {
      userId: new UserId(userId),
    };
  },
  toOutputData: (resume: Resume): ResumeOutputData["getUserResume"] => {
    return { userId: resume.userId.value };
  },
};
