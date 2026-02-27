import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetWorkFlowListHandler } from './application/handlers/get-workflows-list-handler';
import { WorkflowSchema } from './infra/persistence/workflow.schema';
import { NodeSchema } from './infra/persistence/node.schema';
import { EdgeSchema } from './infra/persistence/edge.schema';
import { WorkflowController } from './interface/http/workflow.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { WorkflowMapper } from './infra/mappings/workflow.mapper';
import { CreateWorkflowHandler } from './application/handlers/create-workflow-handler';
import { NodeMapper } from './infra/mappings/node.mapper';
import { EdgeMapper } from './infra/mappings/edge.mapper';

@Module({
  imports: [
    CqrsModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forFeature([WorkflowSchema, NodeSchema, EdgeSchema]),
  ],
  controllers: [WorkflowController],
  providers: [
    GetWorkFlowListHandler,
    CreateWorkflowHandler,
    NodeMapper,
    EdgeMapper,
    WorkflowMapper,
  ],
})
export class CoreModuleModule {}
