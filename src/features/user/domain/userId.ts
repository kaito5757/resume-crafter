export class UserId {
  private readonly _brand = UserId.name;

  constructor(private readonly userId: string) {}

  get value() {
    return this.userId;
  }
}
