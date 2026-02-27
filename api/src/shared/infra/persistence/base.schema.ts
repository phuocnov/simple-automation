import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseSchema {
  @PrimaryColumn({ type: 'uuid' })
  id!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
