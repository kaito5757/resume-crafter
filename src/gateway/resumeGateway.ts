import { Resume } from "../features/resume/domain/resume";
import { ResumeId } from "../features/resume/domain/resumeId";
import type { UserId } from "../features/user/domain/userId";
import { resumeRepository } from "../infrastructure/repository/resumeRepository";

export const resumeGateway = {
  getResume: async (userId: UserId): Promise<Resume | null> => {
    const resumeData = await resumeRepository.getByUserId(userId.value);
    return resumeData ? new Resume(new ResumeId(resumeData.id)) : null;
  },
};
