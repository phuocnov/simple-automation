import type { WorkflowNode } from "@/domain/workflow/workflow.model";
import type { Item } from "@/shared/api/node.api";
import { createSlice } from "@reduxjs/toolkit";
import { applyNodeChanges, type Node, type NodeChange } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

export interface ReactFlowNode {
  id: string;
  position: { x: number; y: number };
  data: {
    label: string;
    type: string;
    inbound: unknown[];
    outbound: unknown[];
  };
  type: string;
}

export type ReactFlowNodeChange = NodeChange;

interface WorkflowState {
  id: string;
  name: string;
  description: string;
  nodes: Node[];
  edges: unknown[];
  handles: unknown[];
  mode: "view" | "edit";
}

const initialState: WorkflowState = {
  id: "",
  name: "",
  description: "",
  nodes: [],
  edges: [],
  handles: [],
  mode: "view",
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    setNodes(state, action: { payload: Node[] }) {
      state.nodes = action.payload;
    },
    setEdges(state, action: { payload: unknown[] }) {
      state.edges = action.payload;
    },
    setHandles(state, action: { payload: unknown[] }) {
      state.handles = action.payload;
    },
    setWorkflow(state, action: { payload: WorkflowState }) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.mode = action.payload.mode;
    },
    onNodesChange(state, action: { payload: ReactFlowNodeChange[] }) {
      state.nodes = applyNodeChanges(action.payload, state.nodes as Node[]) as Node[];
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
        type: "default",
      };
      state.nodes = [...state.nodes, convertedNode];
    },
    toggleMode(state) {
      state.mode = state.mode === "view" ? "edit" : "view";
    },
  },
});

export const {
  setNodes,
  setEdges,
  setHandles,
  setWorkflow,
  onNodesChange,
  addNode,
  toggleMode,
} = workflowSlice.actions;

export default workflowSlice.reducer;
