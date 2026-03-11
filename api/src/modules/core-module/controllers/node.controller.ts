import { Controller, Get } from '@nestjs/common';
import { NodeService } from '../services/node.service';

@Controller('nodes')
export class NodeController {
  constructor(private readonly service: NodeService) { }

  @Get('list')
  getListNodes() {
    return this.service.getListNodes();
  }
}
