import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, constructUsing } from '@automapper/core';
import { NodeSchema } from '../persistence/node.schema';
import { Node } from '../entities/node.entity';

@Injectable()
export class NodeMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        NodeSchema,
        Node,
        constructUsing(
          (source: NodeSchema) =>
            new Node(
              source.id,
              source.type,
              source.data,
              source.position,
              source.createdAt,
              source.updatedAt,
            ),
        ),
      );
    };
  }
}
