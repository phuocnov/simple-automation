import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { v4 as uuidv4 } from 'uuid';
import { WorkflowSchema } from '../persistence/workflow.schema';
import {
  WorkflowItemDto,
  WorkflowListResponseDto,
} from '../dtos/workflow-list-response.dto';
import { CreateWorkflowDto } from '../dtos/create-workflows.dto';
import { Workflow } from '../entities/workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(WorkflowSchema)
    private readonly repository: Repository<WorkflowSchema>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async listWorkflows(
    limit?: number,
    offset?: number,
  ): Promise<WorkflowListResponseDto> {
    const [entities, total] = await this.repository.findAndCount({
      relations: ['nodes', 'edges'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });

    const items: WorkflowItemDto[] = this.mapper.mapArray(
      entities,
      WorkflowSchema,
      WorkflowItemDto,
    );

    return { items, total };
  }

  async createWorkflow(dto: CreateWorkflowDto): Promise<Workflow> {
    const workflowId = uuidv4();
    const newWorkflow = this.repository.create({
      id: workflowId,
      name: dto.name,
      isActive: false,
      description: dto.description || '',
    });

    const savedWorkflow = await this.repository.save(newWorkflow);
    return this.mapper.map(savedWorkflow, WorkflowSchema, Workflow);
  }
}
