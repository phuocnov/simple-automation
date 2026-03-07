import type { Workflow } from "@/domain/workflow/workflow.model";
import type { PaginatedResponse } from "../types/api-response";

export interface ListWorkflowQuery {
    limit?: number;
    offset?: number;
}

export type ListWorkflowResponse = PaginatedResponse<Workflow>;

export interface CreateWorkflowDto {
    name: string;
    description?: string;
}

export type CreateWorkflowResponse = Workflow;