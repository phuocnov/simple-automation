import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workflowApi } from "@/shared/api/workflow.api";
import type { CreateWorkflowDto } from "@/shared/api/workflow.type";

export const WORKFLOW_QUERY_KEYS = {
  all: ['workflows'] as const,
  lists: () => [...WORKFLOW_QUERY_KEYS.all, 'list'] as const,
  list: () => [...WORKFLOW_QUERY_KEYS.lists()] as const,
  details: () => [...WORKFLOW_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...WORKFLOW_QUERY_KEYS.details(), id] as const,
};

export function useListWorkflows() {
  return useQuery({
    queryKey: WORKFLOW_QUERY_KEYS.list(),
    queryFn: () => workflowApi.getListWorkflow(),
  });
}

export function useWorkflowById(workflowId: string, enabled = true) {
  return useQuery({
    queryKey: WORKFLOW_QUERY_KEYS.detail(workflowId),
    queryFn: () => workflowApi.getWorkflowById(workflowId),
    enabled: enabled && !!workflowId,
  });
}

export function useCreateWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateWorkflowDto) => workflowApi.createWorkflow(dto),
    onSuccess: () => {
      // Invalidate and refetch the list after creating a new workflow
      queryClient.invalidateQueries({ queryKey: WORKFLOW_QUERY_KEYS.lists() });
    },
  });
}

export function useDeleteWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workflowId: string) => workflowApi.deleteWorkflow(workflowId),
    onSuccess: () => {
      // Invalidate and refetch the list after deleting a workflow
      queryClient.invalidateQueries({ queryKey: WORKFLOW_QUERY_KEYS.lists() });
    },
  });
}
