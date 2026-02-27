import { Controller } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

@Controller('nodes')
export class EdgeController {
  constructor(private readonly queryBus: QueryBus) { }
}
