import type { WorkflowNode } from "@/domain/workflow/workflow.model"
import type { Item } from "@/shared/api/node.api"
import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'

interface WorkflowState {
  id: string,
  name: string,
  description: string,
  nodes: unknown[],
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
    addNode(state, action: { payload: Item }) {
      // TODO: convert node to react flow node and add to nodes state
      const convertedNode = {
        id: uuidv4(),
        position: { x: 0, y: 0 },
        data: {
          label: action.payload.name,
          type: action.payload.type,
          inbound: action.payload.inbound,
          outbound: action.payload.outbound,
        },
        type: action.payload.type
      }
      state.nodes = [...state.nodes, convertedNode]
    }
  },
})

export const { setNodes, setEdges, setHandles, setWorkflow, onNodeChange, addNode } = workflowSlice.actions

export default workflowSlice.reducer
