import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowSchema } from './persistence/workflow.schema';
import { NodeSchema } from './persistence/node.schema';
import { EdgeSchema } from './persistence/edge.schema';
import { WorkflowController } from './controllers/workflow.controller';
import { NodeController } from './controllers/node.controller';
import { EdgeController } from './controllers/edge.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { WorkflowMapper } from './mappers/workflow.mapper';
import { NodeMapper } from './mappers/node.mapper';
import { EdgeMapper } from './mappers/edge.mapper';
import { NodeFactory } from 'src/shared/factory/node/node.factory';
import { WorkflowService } from './services/workflow.service';
import { NodeService } from './services/node.service';
import { NodeDefinitionMapper } from './mappers/node-definition.mapper';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forFeature([WorkflowSchema, NodeSchema, EdgeSchema]),
  ],
  controllers: [WorkflowController, NodeController, EdgeController],
  providers: [
    WorkflowService,
    NodeMapper,
    EdgeMapper,
    WorkflowMapper,
    NodeService,
    NodeDefinitionMapper,
    NodeFactory,
  ],
})
export class CoreModuleModule {}
