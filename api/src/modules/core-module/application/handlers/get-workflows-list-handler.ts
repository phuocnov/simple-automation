import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWorkflowsListQuery } from '../queries/get-workflows-list.query';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkflowSchema } from '../../infra/persistence/workflow.schema';
import { Repository } from 'typeorm';
import {
  WorkflowItemDto,
  WorkflowListResponseDto,
} from '../dtos/workflow-list-response.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@QueryHandler(GetWorkflowsListQuery)
export class GetWorkFlowListHandler implements IQueryHandler<GetWorkflowsListQuery> {
  constructor(
    @InjectRepository(WorkflowSchema)
    private readonly repository: Repository<WorkflowSchema>,
    @InjectMapper() private readonly mapper: Mapper,
  ) { }

  async execute(
    query: GetWorkflowsListQuery,
  ): Promise<WorkflowListResponseDto> {
    const [entities, total] = await this.repository.findAndCount({
      relations: ['nodes', 'edges'],
      take: query.limit,
      skip: query.offset,
      order: { createdAt: 'DESC' },
    });

    const items: WorkflowItemDto[] = this.mapper.mapArray(
      entities,
      WorkflowSchema,
      WorkflowItemDto,
    );

    return { items, total };
  }
}
