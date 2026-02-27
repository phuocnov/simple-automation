import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class CreateWorkflowDto {
  @Type(() => String)
  name: string;

  @IsOptional()
  @Type(() => String)
  description?: string;
}
