import type { WorkflowNode } from "@/domain/workflow/workflow.model"
import { createSlice } from "@reduxjs/toolkit"

interface WorkflowState {
  id: string,
  name: string,
  description: string,
  nodes: WorkflowNode[],
  edges: unknown[],
  handles: unknown[],
  mode: 'view' | 'edit',
}

const initialState: WorkflowState = {
    id: '',
    name: '',
    description: '',
    nodes: [],
    edges: [],
    handles: [],
    mode: 'view',
}

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes(state, action: { payload: WorkflowNode[] }) {
      state.nodes = action.payload
    },
    setEdges(state, action: { payload: unknown[] }) {
      state.edges = action.payload
    },
    setHandles(state, action: { payload: unknown[] }) {
      state.handles = action.payload
    },
    setWorkflow(state, action: { payload: WorkflowState }) {
      state.id = action.payload.id
      state.name = action.payload.name
      state.mode = action.payload.mode
    },
    onNodeChange(state, action: { payload: WorkflowNode }) {
      const index = state.nodes.findIndex(node => node.id === action.payload.id)
      if (index !== -1) {
        state.nodes[index] = action.payload
      }
    },
  },
})

export const { setNodes, setEdges, setHandles, setWorkflow, onNodeChange } = workflowSlice.actions

export default workflowSlice.reducer