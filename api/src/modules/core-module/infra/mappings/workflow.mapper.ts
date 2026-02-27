import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { MAPPER_TOKEN } from "./inject-mapper";
import Mapper from "@automapper/types";

@Injectable()
export class WorkflowMapper implements OnModuleInit {
  constructor(@Inject(MAPPER_TOKEN) private readonly mapper: Mapper) { }

  onModuleInit() {
  }
}
