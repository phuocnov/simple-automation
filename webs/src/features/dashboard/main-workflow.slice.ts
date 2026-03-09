import type { WorkflowNode } from "@/domain/workflow/workflow.model"
import { createSlice } from "@reduxjs/toolkit"

interface Workflow {
  id: string,
  name: string,
  description: string,
  nodes: WorkflowNode[],
  edges: unknown[],
  handles: unknown[],
  status: 'active' | 'inactive'
}

interface WorkflowState {
    selectedWorkflow: Workflow | null,
    workflowList: Workflow[],
    mode: 'edit' | 'view'
}

const initialState: WorkflowState = {
    selectedWorkflow: null,
    workflowList: [],
    mode: 'view'
}

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes(state, action: { payload: WorkflowNode[] }) {
      if (state.selectedWorkflow) {
        state.selectedWorkflow.nodes = action.payload
      }
    },
    setEdges(state, action: { payload: unknown[] }) {
      if (state.selectedWorkflow) {
        state.selectedWorkflow.edges = action.payload
      }
    },
    setHandles(state, action: { payload: unknown[] }) {
      if (state.selectedWorkflow) {
        state.selectedWorkflow.handles = action.payload
      }
    },
     setWorkflow(state, action: { payload: WorkflowState }) {
      state.selectedWorkflow = action.payload.selectedWorkflow
      state.workflowList = action.payload.workflowList
      state.mode = action.payload.mode
     },
     onNodeChange(state, action: { payload: WorkflowNode }) {
      if (state.selectedWorkflow) {
        const index = state.selectedWorkflow.nodes.findIndex(node => node.id === action.payload.id)
        if (index !== -1) {
          state.selectedWorkflow.nodes[index] = action.payload
        }
      }
     },
     onEdgeChange(state, action: { payload: unknown }) {
        
    },
    
  },
})

export const { setNodes, setEdges, setHandles, setWorkflow, onNodeChange, onEdgeChange } = workflowSlice.actions

export default workflowSlice.reducer