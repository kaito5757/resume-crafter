import { resumeGateway } from "@/src/gateway/resumeGateway";
import type { Resume } from "./domain/resume";
import { getUserResumeMapper } from "./resumeMapper";

export const resumeUseCase = {
  getResume: async (userId: string): Promise<Resume> => {
    const domain = getUserResumeMapper.toDomainFromInputData(userId);
    const resume = await resumeGateway.getResume(domain.userId);
    if (!resume) {
      throw new Error("resume not found");
    }
    return resume;
  },
};
