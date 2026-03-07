import { api } from "@/config/api";
import type { CreateWorkflowDto, CreateWorkflowResponse, ListWorkflowResponse } from "./workflow.type";

export const workflowApi = {
    async getListWorkflow(): Promise<ListWorkflowResponse> {
        const response = await api.get<ListWorkflowResponse>('/workflows');
        return response.data;
    },
    async createWorkflow(dto: CreateWorkflowDto): Promise<CreateWorkflowResponse> {
        const response = await api.post<CreateWorkflowResponse>('/workflows', dto);
        return response.data;
    },
    async getWorkflowById(workflowId: string) {
        const response = await api.get(`/workflows/${workflowId}`);
        return response.data;
    },
    async deleteWorkflow(workflowId: string) {
        await api.delete(`/workflows/${workflowId}`);
    }
}