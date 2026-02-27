import { CommandHandler, ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { CreateWorkflowCommand } from "../commands/create-workflow.command";
import { WorkflowSchema } from "../../infra/persistence/workflow.schema";
import { Repository } from "typeorm";
import { Workflow } from "../../domain/entities/workflow.entity";

@CommandHandler(CreateWorkflowCommand)
export class CreateWorkflowHandler implements ICommandHandler<CreateWorkflowCommand> {
  constructor(private respository: Repository<WorkflowSchema>) { }
  async execute(command: CreateWorkflowCommand): Promise<Workflow> {
    const workflow = this.respository.create({
      ...command,
      isActive: false
    })

    const savedWorkflow = await this.respository.save(workflow);
    return savedWorkflow;
  }
}
