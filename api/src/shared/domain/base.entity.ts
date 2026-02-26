export abstract class BaseEntity {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) { }

  // Example of domain logic shared by all entities
  public equals(other: BaseEntity): boolean {
    if (other === null || other === undefined) return false;
    return this.id === other.id;
  }
}
