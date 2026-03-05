import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetNodeQueryDto {
  @ApiPropertyOptional({
    description: 'search node by type',
  })
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    description: 'search node by name',
  })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'page number',
    default: 1,
  })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'number of items per page',
    default: 10,
  })
  @IsOptional()
  limit?: number;
}
