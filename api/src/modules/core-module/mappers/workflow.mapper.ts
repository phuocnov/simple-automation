import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  Mapper,
  createMap,
  forMember,
  mapFrom,
  constructUsing,
} from '@automapper/core';
import { WorkflowSchema } from '../persistence/workflow.schema';
import { Workflow } from '../entities/workflow.entity';
import { NodeSchema } from '../persistence/node.schema';
import { Node } from '../entities/node.entity';
import { EdgeSchema } from '../persistence/edge.schema';
import { Edge } from '../entities/edge.entity';
import {
  CreateWorkflowResponse,
  WorkflowItemDto,
} from '../dtos/workflow-list-response.dto';

@Injectable()
export class WorkflowMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        WorkflowSchema,
        Workflow,
        constructUsing(
          (source: WorkflowSchema) =>
            new Workflow(
              source.id,
              source.name,
              source.isActive,
              source.nodes
                ? mapper.mapArray(source.nodes, NodeSchema, Node)
                : [],
              source.edges
                ? mapper.mapArray(source.edges, EdgeSchema, Edge)
                : [],
              source.createdAt,
              source.updatedAt,
            ),
        ),
      );

      createMap(
        mapper,
        WorkflowSchema,
        WorkflowItemDto,
        forMember(
          (dest) => dest.id,
          mapFrom((source: WorkflowSchema) => source.id),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((source: WorkflowSchema) => source.name),
        ),
        forMember(
          (dest) => dest.isActive,
          mapFrom((source: WorkflowSchema) => source.isActive),
        ),
        forMember(
          (dest) => dest.nodeCount,
          mapFrom((source: WorkflowSchema) => source.nodes?.length || 0),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((source: WorkflowSchema) => source.createdAt.toISOString()),
        ),
      );

      createMap(
        mapper,
        Workflow,
        WorkflowItemDto,
        forMember(
          (dest) => dest.id,
          mapFrom((source: Workflow) => source.id),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((source: Workflow) => source.name),
        ),
        forMember(
          (dest) => dest.isActive,
          mapFrom((source: Workflow) => source.isActive),
        ),
        forMember(
          (dest) => dest.nodeCount,
          mapFrom((source: Workflow) => source.nodes?.length || 0),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((source: Workflow) => source.createdAt.toISOString()),
        ),
      );

      createMap(
        mapper,
        Workflow,
        CreateWorkflowResponse,
        forMember(
          (dest) => dest.id,
          mapFrom((source: Workflow) => source.id),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((source: Workflow) => source.name),
        ),
        forMember(
          (dest) => dest.isActive,
          mapFrom((source: Workflow) => source.isActive),
        ),
        forMember(
          (dest) => dest.nodeCount,
          mapFrom((source: Workflow) => source.nodes?.length || 0),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((source: Workflow) => source.createdAt.toISOString()),
        ),
      );
    };
  }
}
