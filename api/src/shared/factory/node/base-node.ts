export interface NodePort {
  name: string;
  type: string;
}

export interface NodeDefinition {
  type: string;
  name: string;
  inbound: NodePort[];
  outbound: NodePort[];
}

export abstract class BaseNode<I = unknown, O = unknown> {
  abstract readonly type: string;
  abstract readonly name: string;

  abstract process(input: I): Promise<O>;
  abstract getDefinition(): NodeDefinition;
}
