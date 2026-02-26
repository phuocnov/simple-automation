export class WorkflowItemDto {
  id: string;
  name: string;
  isActive: boolean;
  nodeCount: number;
  createdAt: string;
}

export class WorkflowListResponseDto {
  items: WorkflowItemDto[];
  total: number;
}
