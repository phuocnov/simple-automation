import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap, constructUsing } from '@automapper/core';
import { EdgeSchema } from '../persistence/edge.schema';
import { Edge } from '../entities/edge.entity';

@Injectable()
export class EdgeMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        EdgeSchema,
        Edge,
        constructUsing(
          (source: EdgeSchema) =>
            new Edge(
              source.id,
              source.sourceId,
              source.targetId,
              source.createdAt,
              source.updatedAt,
            ),
        ),
      );
    };
  }
}
