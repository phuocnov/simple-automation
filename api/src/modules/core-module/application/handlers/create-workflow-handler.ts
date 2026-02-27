import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateWorkflowCommand } from "../commands/create-workflow.command";
import { WorkflowSchema } from "../../infra/persistence/workflow.schema";
import { Repository } from "typeorm";
import { Workflow } from "../../domain/entities/workflow.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { v4 as uuidv4 } from 'uuid'

@CommandHandler(CreateWorkflowCommand)
export class CreateWorkflowHandler implements ICommandHandler<CreateWorkflowCommand> {
  constructor(
    @InjectRepository(WorkflowSchema)
    private respository: Repository<WorkflowSchema>,
    @InjectMapper() private readonly mapper: Mapper,
  ) { }
  async execute(command: CreateWorkflowCommand): Promise<Workflow> {
    const workflowId = uuidv4();
    const newWorkflow = this.respository.create({
      id: workflowId,
      name: command.name,
      isActive: false,
      description: command.description || ''

    })
    const savedWorkflow = await this.respository.save(newWorkflow);
    return this.mapper.map(savedWorkflow, WorkflowSchema, Workflow);
  }
}
