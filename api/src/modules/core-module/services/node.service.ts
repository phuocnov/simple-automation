import { Inject, Injectable } from '@nestjs/common';
import { NodeFactory } from '@/shared/factory/node/node.factory';
import { NodeDefinitionMapper } from '../mappers/node-definition.mapper';

@Injectable()
export class NodeService {
  constructor(
    @Inject() private readonly nodeFactory: NodeFactory,
    private readonly mapper: NodeDefinitionMapper,
  ) {}

  getListNodes() {
    const raw = this.nodeFactory.getList();
    return this.mapper.toResponseDtoList(raw);
  }
}
