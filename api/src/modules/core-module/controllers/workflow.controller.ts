import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetWorkflowsQueryDto } from '../dtos/get-workflows-query.dto';
import {
  CreateWorkflowResponse,
  WorkflowListResponseDto,
} from '../dtos/workflow-list-response.dto';
import { CreateWorkflowDto } from '../dtos/create-workflows.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Workflow } from '../entities/workflow.entity';
import { WorkflowService } from '../services/workflow.service';

@ApiTags('workflows')
@Controller('workflows')
export class WorkflowController {
  constructor(
    private readonly workflowService: WorkflowService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

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
    return this.workflowService.listWorkflows(
      dto.search,
      dto.limit,
      dto.offset,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workflow by ID' })
  @ApiOkResponse({ type: Workflow })
  async findById(@Query('id') id: string): Promise<Workflow> {
    return this.workflowService.getWorkflowById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create workflow' })
  @ApiBody({ type: CreateWorkflowDto })
  @ApiCreatedResponse({ type: CreateWorkflowResponse })
  async create(
    @Body() createWorkflowDto: CreateWorkflowDto,
  ): Promise<CreateWorkflowResponse> {
    const workflow =
      await this.workflowService.createWorkflow(createWorkflowDto);

    return this.mapper.map(workflow, Workflow, CreateWorkflowResponse);
  }
}
