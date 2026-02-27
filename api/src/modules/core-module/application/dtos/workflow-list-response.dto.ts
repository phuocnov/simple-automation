import { ApiProperty } from '@nestjs/swagger';

export class WorkflowItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  nodeCount: number;

  @ApiProperty()
  createdAt: string;
}

export class WorkflowListResponseDto {
  @ApiProperty({ type: () => [WorkflowItemDto] })
  items: WorkflowItemDto[];

  @ApiProperty()
  total: number;
}

export class CreateWorkflowResponse extends WorkflowItemDto { }
