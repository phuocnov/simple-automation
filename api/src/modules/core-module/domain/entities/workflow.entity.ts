import { BaseEntity } from 'src/shared/domain/base.entity';
import { Node } from './node.entity';
import { Edge } from './edge.entity';

export class Workflow extends BaseEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public nodes: Node[],
    public edges: Edge[],
    createdAt: Date,
    updatedAt: Date,
    public description?: string,
  ) {
    super(id, createdAt, updatedAt);
  }

  public canBeActivated(): boolean {
    return (
      this.nodes.length > 0 &&
      this.nodes.some((n) => n.type.includes('trigger'))
    );
  }
}
