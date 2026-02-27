import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from 'automapper-nestjs';
import {
  Mapper,
  createMap,
  forMember,
  mapFrom,
  constructUsing,
} from 'automapper-core';
import { WorkflowSchema } from '../persistence/workflow.schema';
import { Workflow } from '../../domain/entities/workflow.entity';
import { NodeSchema } from '../persistence/node.schema';
import { Node } from '../../domain/entities/node.entity';
import { EdgeSchema } from '../persistence/edge.schema';
import { Edge } from '../../domain/entities/edge.entity';
import {
  CreateWorkflowResponse,
  WorkflowItemDto,
} from '../../application/dtos/workflow-list-response.dto';
import { CreateWorkflowCommand } from '../../application/commands/create-workflow.command';

@Injectable()
export class WorkflowMapper extends AutomapperProfile {
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
          (source) =>
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

      createMap(
        mapper,
        EdgeSchema,
        Edge,
        constructUsing(
          (source) =>
            new Edge(
              source.id,
              source.sourceId,
              source.targetId,
              source.createdAt,
              source.updatedAt,
            ),
        ),
      );

      createMap(
        mapper,
        WorkflowSchema,
        Workflow,
        constructUsing(
          (source) =>
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
          mapFrom((source) => source.id),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((source) => source.name),
        ),
        forMember(
          (dest) => dest.isActive,
          mapFrom((source) => source.isActive),
        ),
        forMember(
          (dest) => dest.nodeCount,
          mapFrom((source) => source.nodes?.length || 0),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((source) => source.createdAt.toISOString()),
        ),
      );

      createMap(
        mapper,
        CreateWorkflowCommand,
        WorkflowSchema,
        forMember(
          (dest) => dest.name,
          mapFrom((source) => source.name),
        ),
      );

      createMap(
        mapper,
        Workflow,
        WorkflowItemDto,
        forMember(
          (dest) => dest.id,
          mapFrom((source) => source.id),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((source) => source.name),
        ),
        forMember(
          (dest) => dest.isActive,
          mapFrom((source) => source.isActive),
        ),
        forMember(
          (dest) => dest.nodeCount,
          mapFrom((source) => source.nodes?.length || 0),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((source) => source.createdAt.toISOString()),
        ),
      );

      createMap(
        mapper,
        Workflow,
        CreateWorkflowResponse,
        forMember(
          (dest) => dest.id,
          mapFrom((source) => source.id),
        ),
        forMember(
          (dest) => dest.name,
          mapFrom((source) => source.name),
        ),
        forMember(
          (dest) => dest.isActive,
          mapFrom((source) => source.isActive),
        ),
        forMember(
          (dest) => dest.nodeCount,
          mapFrom((source) => source.nodes?.length || 0),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((source) => source.createdAt.toISOString()),
        ),
      );
    };
  }
}
