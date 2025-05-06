import type { ResumeId } from "./resumeId";

export class Resume {
  private readonly _brand = Resume.name;

  constructor(public readonly userId: ResumeId) {}
}
