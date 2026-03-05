import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkflowDto {
  @ApiProperty({ description: 'Workflow name', example: 'Daily import' })
  @Type(() => String)
  name: string;

  @ApiPropertyOptional({
    description: 'Workflow description',
    example: 'Imports data every day at 02:00',
  })
  @IsOptional()
  @Type(() => String)
  description?: string;
}
