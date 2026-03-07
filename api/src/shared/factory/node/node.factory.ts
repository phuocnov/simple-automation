import { Injectable } from '@nestjs/common';
import { BaseNode } from './base-node';
import { AddNode } from './add.node';
import { UppercaseNode } from './uppercase.node';
import { VariableNode } from './variable.node';

@Injectable()
export class NodeFactory {
  private readonly nodeMap: Record<string, new () => BaseNode> = {
    ADD: AddNode,
    UPPERCASE: UppercaseNode,
    VARIABLE: VariableNode,
  };

  create(type: string): BaseNode {
    const NodeClass = this.nodeMap[type];

    if (!NodeClass) {
      throw new Error(`Node type ${type} not supported`);
    }

    return new NodeClass();
  }

  getList() {
    return Object.values(this.nodeMap).map((NodeClass) => {
      const node = new NodeClass();

      return {
        type: node.type,
        name: node.name,
        description: node.getDefinition(),
      };
    });
  }
}
