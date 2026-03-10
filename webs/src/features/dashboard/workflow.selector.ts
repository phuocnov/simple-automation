import type { RootState } from "@/app/store/store";

export const selectedWorkflow = (state: RootState) => ({
    id: state.workflow.id,
    name: state.workflow.name,
    description: state.workflow.description,
    nodes: state.workflow.nodes,
    edges: state.workflow.edges,
    handles: state.workflow.handles,
    mode: state.workflow.mode,
});
