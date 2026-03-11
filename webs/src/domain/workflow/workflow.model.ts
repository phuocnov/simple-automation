export interface Workflow {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  nodeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BaseNodeProperties {
  name: string;
  type: string;
  description?: string;
}

export interface BaseNodeDefinition {
  type: string;
  name: string;
  inbound: BaseNodeDefinition[];
  outbound: BaseNodeDefinition[];
}

export interface WorkflowNode {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  inbound: BaseNodeProperties[];
  outbound: BaseNodeDefinition[];
}
