import { Query } from '@nestjs/cqrs';
import { WorkflowListResponseDto } from '../dtos/workflow-list-response.dto';

export class GetWorkflowsListQuery extends Query<WorkflowListResponseDto> {
  constructor(
    public readonly limit?: number,
    public readonly offset?: number,
  ) {
    super();
  }
}
