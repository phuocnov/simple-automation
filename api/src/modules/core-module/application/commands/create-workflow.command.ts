import { Command } from "@nestjs/cqrs";
import { CreateWorkflowDto } from "../../interface/dtos/create-workflows.dto";

export class CreateWorkflowCommand extends Command<CreateWorkflowDto> {
  constructor(
    public readonly name: string,
    public readonly description?: string,
  ) { super() }
}
