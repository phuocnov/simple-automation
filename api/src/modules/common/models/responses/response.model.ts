import { ApiProperty } from '@nestjs/swagger';

export class ResponseModel<T> {
  @ApiProperty()
  status: number;

  @ApiProperty()
  success: boolean;

  data: T;
}
