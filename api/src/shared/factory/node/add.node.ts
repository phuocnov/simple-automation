import { BaseNode, NodeDefinition } from './base-node';

export interface IAddNode {
  a: number;
  b: number;
}

export interface OAddNode {
  result: number;
}

export class AddNode extends BaseNode<IAddNode, OAddNode> {
  readonly type = 'ADD';
  readonly name = 'Add node';

  async process(input: IAddNode): Promise<OAddNode> {
    return Promise.resolve({
      result: input.a + input.b,
    });
  }

  getDefinition(): NodeDefinition {
    return {
      type: 'ADD',
      name: 'Add node',
      inbound: [
        { name: 'a', type: 'number' },
        { name: 'b', type: 'number' },
      ],
      outbound: [{ name: 'result', type: 'number' }],
    };
  }
}
