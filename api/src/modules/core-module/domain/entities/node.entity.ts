import { BaseEntity } from "src/shared/domain/base.entity";

export class Node extends BaseEntity {
  constructor(
    public readonly id: string,
    public type: string,
    public data: unknown,
    public position: {
      x: number;
      y: number;
    },
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt)
  }
}
