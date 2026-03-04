import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetListNodeQueryDto {
  @ApiPropertyOptional({
    description: 'search node by type'
  })
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    description: 'search node by name'
  })
  @IsOptional()
  name?: string;
}
