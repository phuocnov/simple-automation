import { Injectable } from '@nestjs/common';
import {
  NodeDefinitionDto,
  NodeDefinitionResponseDto,
  NodePortDto,
} from '../dtos/get-list-nodes-response.dto';
import toStringSafe from '@/helpers/string.helper';

@Injectable()
export class NodeDefinitionMapper {
  toNodePortDto(port: unknown): NodePortDto {
    if (!port || typeof port !== 'object') {
      return { name: '', type: '' };
    }

    const p = port as Record<string, unknown>;

    return {
      name: toStringSafe(p.name),
      type: toStringSafe(p.type),
    };
  }

  toNodeDefinitionDto(def: unknown): NodeDefinitionDto {
    if (!def || typeof def !== 'object') {
      return { type: '', name: '', inbound: [], outbound: [] };
    }

    const d = def as Record<string, unknown>;

    const inboundRaw = Array.isArray(d.inbound) ? (d.inbound as unknown[]) : [];
    const outboundRaw = Array.isArray(d.outbound)
      ? (d.outbound as unknown[])
      : [];

    return {
      type: toStringSafe(d.type),
      name: toStringSafe(d.name),
      inbound: inboundRaw.map((p) => this.toNodePortDto(p)),
      outbound: outboundRaw.map((p) => this.toNodePortDto(p)),
    };
  }

  toResponseDto(item: unknown): NodeDefinitionResponseDto {
    if (!item || typeof item !== 'object') {
      return {
        type: '',
        name: '',
        definition: { type: '', name: '', inbound: [], outbound: [] },
      };
    }

    const it = item as Record<string, unknown>;

    const definitionSource = it.definition ?? it.description ?? {};

    return {
      type: toStringSafe(it.type),
      name: toStringSafe(it.name),
      definition: this.toNodeDefinitionDto(definitionSource),
    };
  }

  toResponseDtoList(items: unknown[]): NodeDefinitionResponseDto[] {
    if (!Array.isArray(items)) return [];
    return items.map((it) => this.toResponseDto(it));
  }
}
