import { api } from "@/config/api"

export interface ListNodeDefinitionResponse {
  items: Item[]
  total: number
}

export interface Item {
  type: string
  name: string
  definition?: Definition
}

export interface Definition {
  type: string
  name: string
  inbound: Inbound[]
  outbound: Outbound[]
}

export interface Inbound {
  name: string
  type: string
  description?: string;
}

export interface Outbound {
  name: string
  type: string
  description?: string;
}

export const nodeApi = {
  async getAllNodeDefinition(): Promise<ListNodeDefinitionResponse> {
    const response = await api.get<ListNodeDefinitionResponse>('nodes/list');
    return response.data;
  }
}
