import { BaseNode, NodeDefinition } from './base-node';

export interface IUppperCaseNode {
  s: string;
}

export interface OUppercaseNode {
  result: string;
}

export class UppercaseNode extends BaseNode<IUppperCaseNode, OUppercaseNode> {
  readonly type = 'UPPERCASE';
  readonly name = 'Uppercase node';

  async process(input: IUppperCaseNode): Promise<OUppercaseNode> {
    const result = input.s.toUpperCase();

    return Promise.resolve({ result });
  }
  getDefinition(): NodeDefinition {
    return {
      type: 'UPPERCASE',
      name: 'Uppercase node',
      inbound: [{ name: 's', type: 'string' }],
      outbound: [
        {
          name: 'result',
          type: 'string',
        },
      ],
    };
  }
}
