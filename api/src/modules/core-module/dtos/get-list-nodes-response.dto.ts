import { ResponsePaginationModel } from '@/modules/common/models/responses/response.pagination.model';
import { ApiProperty } from '@nestjs/swagger';

export class NodePortDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;
}
export class NodeDefinitionDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [NodePortDto] })
  inbound: NodePortDto[];

  @ApiProperty({ type: [NodePortDto] })
  outbound: NodePortDto[];
}

export class NodeDefinitionResponseDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: NodeDefinitionDto })
  definition: NodeDefinitionDto;
}

export class GetListNodeResponseDto extends ResponsePaginationModel<NodeDefinitionResponseDto> {}
