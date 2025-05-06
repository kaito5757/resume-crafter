import { UserId } from "../user/domain/userId";
import { Resume } from "./domain/resume";
import { ResumeId } from "./domain/resumeId";
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
  toDomainFromRepository: (resume: {
    id: string;
    userId: string;
    name: string;
  }): Resume => {
    return new Resume(new ResumeId(resume.id));
  },
  toOutputData: (resume: Resume): ResumeOutputData["getUserResume"] => {
    return { userId: resume.userId.value };
  },
};
