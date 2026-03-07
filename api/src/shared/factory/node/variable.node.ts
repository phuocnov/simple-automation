import { BaseNode, NodeDefinition } from './base-node';

interface IVariableNode {
  type: 'string' | 'number' | 'boolean';
  value: string | number | boolean;
}

interface OVariableNode {
  type: 'string' | 'number' | 'boolean';
  value: string | number | boolean;
}

export class VariableNode implements BaseNode<IVariableNode, OVariableNode> {
  readonly type = 'VARIABLE';
  readonly name = 'Variable node';
  process(input: IVariableNode): Promise<OVariableNode> {
    return Promise.resolve(input);
  }
  getDefinition(): NodeDefinition {
    return {
      type: 'VARIABLE',
      name: 'Variable node',
      inbound: [
        { name: 'type', type: 'string' },
        { name: 'value', type: 'string | number | boolean' },
      ],
      outbound: [
        { name: 'type', type: 'string' },
        { name: 'value', type: 'string | number | boolean' },
      ],
    };
  }
}
