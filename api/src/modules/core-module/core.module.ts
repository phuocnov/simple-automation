import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetWorkFlowListHandler } from './application/handlers/get-workflows-list-handler';
import { WorkflowSchema } from './infra/persistence/workflow.schema';
import { NodeSchema } from './infra/persistence/node.schema';
import { EdgeSchema } from './infra/persistence/edge.schema';
import { WorkflowController } from './interface/http/workflow.controller';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([WorkflowSchema, NodeSchema, EdgeSchema])],
  controllers: [WorkflowController],
  providers: [GetWorkFlowListHandler],
})
export class CoreModuleModule { }
