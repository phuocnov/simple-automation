import { BaseEntity } from '@/shared/domain/base.entity';

export class Edge extends BaseEntity {
  constructor(
    public readonly id: string,
    public source: string,
    public target: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
