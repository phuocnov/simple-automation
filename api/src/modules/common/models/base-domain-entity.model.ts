export abstract class BaseDomainEntityModel {
  public id?: string | null;
  public createdAt?: Date | null;
  public updatedAt?: Date | null;
  public createdBy?: string | null;
  public updatedBy?: string | null;
}
