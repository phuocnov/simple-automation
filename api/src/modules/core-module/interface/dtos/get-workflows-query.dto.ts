import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetWorkflowsQueryDto {
  @IsOptional()
  @Type(() => Number) // Converts string '10' from URL to number 10
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10; // Default value

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
