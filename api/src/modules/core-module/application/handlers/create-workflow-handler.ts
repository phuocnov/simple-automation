import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateWorkflowCommand } from "../commands/create-workflow.command";
import { WorkflowSchema } from "../../infra/persistence/workflow.schema";
import { Repository } from "typeorm";
import { Workflow } from "../../domain/entities/workflow.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "automapper-nestjs";
import { Mapper } from "automapper-core";

@CommandHandler(CreateWorkflowCommand)
export class CreateWorkflowHandler implements ICommandHandler<CreateWorkflowCommand> {
  constructor(
    @InjectRepository(WorkflowSchema)
    private respository: Repository<WorkflowSchema>,
    @InjectMapper() private readonly mapper: Mapper,
  ) { }
  async execute(command: CreateWorkflowCommand): Promise<Workflow> {
    const workflowSchema = this.mapper.map(
      command,
      CreateWorkflowCommand,
      WorkflowSchema,
    );
    workflowSchema.isActive = false;

    const savedWorkflow = await this.respository.save(workflowSchema);
    return this.mapper.map(savedWorkflow, WorkflowSchema, Workflow);
  }
}
