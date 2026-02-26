import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetWorkflowsListQuery } from "../queries/get-workflows-list.query";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkflowSchema } from "../../infra/persistence/workflow.schema";
import { Repository } from "typeorm";
import { WorkflowItemDto, WorkflowListResponseDto } from "../dtos/workflow-list-response.dto";

@QueryHandler(GetWorkflowsListQuery)
export class GetWorkFlowListHandler implements IQueryHandler<GetWorkflowsListQuery> {
  constructor(
    @InjectRepository(WorkflowSchema)
    private readonly repository: Repository<WorkflowSchema>
  ) { }

  async execute(query: GetWorkflowsListQuery): Promise<WorkflowListResponseDto> {
    const [entities, total] = await this.repository.findAndCount({
      take: query.limit,
      skip: query.offset,
      order: { createdAt: 'DESC' }
    })

    // Manual Mapping: Schema -> Response DTO
    const items: WorkflowItemDto[] = entities.map((schema) => ({
      id: schema.id,
      name: schema.name,
      isActive: schema.isActive,
      nodeCount: schema.nodes?.length || 0,
      createdAt: schema.createdAt.toISOString(), // Convert Date object to String
    }));

    return { items, total };
  }

}
