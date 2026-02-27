import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetWorkflowsQueryDto } from '../dtos/get-workflows-query.dto';
import { GetWorkflowsListQuery } from '../../application/queries/get-workflows-list.query';
import { CreateWorkflowResponse, WorkflowListResponseDto } from '../../application/dtos/workflow-list-response.dto';
import { CreateWorkflowDto } from '../dtos/create-workflows.dto';

@Controller('workflows')
export class WorkflowController {
  constructor(private readonly queryBus: QueryBus) { }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Query() dto: GetWorkflowsQueryDto,
  ): Promise<WorkflowListResponseDto> {
    return this.queryBus.execute<WorkflowListResponseDto>(
      new GetWorkflowsListQuery(dto.limit, dto.offset),
    );
  }

  @Post()
  async create(
    @Body() createWorkflowDto: CreateWorkflowDto
  ): Promise<CreateWorkflowResponse> {
    return this.queryBus
  }
}
