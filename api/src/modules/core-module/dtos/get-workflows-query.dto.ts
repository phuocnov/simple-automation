import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class GetWorkflowsQueryDto {
  @ApiPropertyOptional({
    description: 'Number of items to return',
    minimum: 1,
    maximum: 100,
    default: 10,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number) // Converts string '10' from URL to number 10
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10; // Default value

  @ApiPropertyOptional({
    description: 'Number of items to skip',
    minimum: 0,
    default: 0,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;
}
