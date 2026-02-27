import { Controller, Get, UsePipes, ValidationPipe } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

@Controller('nodes')
export class NodeController {
  constructor(private readonly queryBus: QueryBus) { }
}
