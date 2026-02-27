import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetWorkflowsQueryDto } from '../dtos/get-workflows-query.dto';
import { GetWorkflowsListQuery } from '../../application/queries/get-workflows-list.query';
import { CreateWorkflowResponse, WorkflowListResponseDto } from '../../application/dtos/workflow-list-response.dto';
import { CreateWorkflowDto } from '../dtos/create-workflows.dto';
import { CreateWorkflowCommand } from '../../application/commands/create-workflow.command';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Workflow } from '../../domain/entities/workflow.entity';

@ApiTags('workflows')
@Controller('workflows')
export class WorkflowController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    @InjectMapper() private readonly mapper: Mapper,
  ) { }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get workflows list' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items to return (1-100).',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    example: 0,
    description: 'Number of items to skip.',
  })
  @ApiOkResponse({ type: WorkflowListResponseDto })
  async findAll(
    @Query() dto: GetWorkflowsQueryDto,
  ): Promise<WorkflowListResponseDto> {
    return this.queryBus.execute<WorkflowListResponseDto>(
      new GetWorkflowsListQuery(dto.limit, dto.offset),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create workflow' })
  @ApiBody({ type: CreateWorkflowDto })
  @ApiCreatedResponse({ type: CreateWorkflowResponse })
  async create(
    @Body() createWorkflowDto: CreateWorkflowDto
  ): Promise<CreateWorkflowResponse> {
    const workflow = await this.commandBus.execute<Workflow>(
      new CreateWorkflowCommand(
        createWorkflowDto.name,
        createWorkflowDto.description,
      ),
    );

    return this.mapper.map(workflow, Workflow, CreateWorkflowResponse);
  }
}
