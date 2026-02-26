import { ApiProperty } from '@nestjs/swagger';

export class ResponsePaginationModel<T> {
  @ApiProperty()
  total: number;

  results: T;
}
