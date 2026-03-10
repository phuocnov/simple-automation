import { BaseSchema } from '@/shared/infra/persistence/base.schema';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { WorkflowSchema } from './workflow.schema';
import { EdgeSchema } from './edge.schema';

@Entity('nodes')
export class NodeSchema extends BaseSchema {
  @Column()
  type: string;

  @Column({ type: 'jsonb' })
  data: unknown;

  @Column({ type: 'jsonb' })
  position: {
    x: number;
    y: number;
  };

  @ManyToOne(() => WorkflowSchema, (workflow) => workflow.nodes, {
    onDelete: 'CASCADE',
  })
  workflow: WorkflowSchema;

  @OneToMany(() => EdgeSchema, (edge) => edge.source)
  outgoingEdges: EdgeSchema[];

  @OneToMany(() => EdgeSchema, (edge) => edge.target)
  incomingEdges: EdgeSchema[];
}
