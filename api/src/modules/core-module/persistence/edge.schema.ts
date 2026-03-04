import { BaseSchema } from 'src/shared/infra/persistence/base.schema';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { WorkflowSchema } from './workflow.schema';
import { NodeSchema } from './node.schema';

@Entity('edges')
export class EdgeSchema extends BaseSchema {
  @Column()
  sourceId: string;

  @Column()
  targetId: string;

  @ManyToOne(() => WorkflowSchema, (workflow) => workflow.edges, {
    onDelete: 'CASCADE',
  })
  workflow: WorkflowSchema;

  @ManyToOne(() => NodeSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sourceId' })
  source: NodeSchema;

  @ManyToOne(() => NodeSchema, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'targetId' })
  target: NodeSchema;
}
