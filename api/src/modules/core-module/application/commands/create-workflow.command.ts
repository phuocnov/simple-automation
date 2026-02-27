import { Command } from "@nestjs/cqrs";
import { Workflow } from "../../domain/entities/workflow.entity";

export class CreateWorkflowCommand extends Command<Workflow> {
  constructor(
    public readonly name: string,
    public readonly description?: string,
  ) { super() }
}
