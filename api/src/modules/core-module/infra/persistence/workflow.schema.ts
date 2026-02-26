import { BaseSchema } from "src/shared/infra/persistence/base.schema";
import { Column, Entity } from "typeorm";

@Entity('workflows')
export class WorkflowSchema extends BaseSchema {
  @Column()
  name: string;

  @Column({ type: 'jsonb', default: [] })
  nodes: unknown[];

  @Column({ type: 'jsonb', default: [] })
  edges: unknown[];

  @Column({ default: false })
  isActive: boolean
}
