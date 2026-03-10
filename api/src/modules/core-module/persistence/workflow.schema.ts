import { BaseSchema } from '@/shared/infra/persistence/base.schema';
import { Column, Entity, OneToMany } from 'typeorm';
import { NodeSchema } from './node.schema';
import { EdgeSchema } from './edge.schema';

@Entity('workflows')
export class WorkflowSchema extends BaseSchema {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => NodeSchema, (node) => node.workflow)
  nodes: NodeSchema[];

  @OneToMany(() => EdgeSchema, (edge) => edge.workflow)
  edges: EdgeSchema[];

  @Column({ default: false })
  isActive: boolean;
}
