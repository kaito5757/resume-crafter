import type { Resume } from "../features/resume/domain/resume";
import { getUserResumeMapper } from "../features/resume/resumeMapper";
import type { UserId } from "../features/user/domain/userId";
import { resumeRepository } from "../infrastructure/repository/resumeRepository";

export const resumeGateway = {
  getResume: async (userId: UserId): Promise<Resume | null> => {
    const resumeData = await resumeRepository.getByUserId(userId.value);
    return resumeData
      ? getUserResumeMapper.toDomainFromRepository(resumeData)
      : null;
  },
};
