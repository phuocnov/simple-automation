import { Inject } from "@nestjs/common";
export const MAPPER_TOKEN = 'CoreMapper'
export const InjectMapper = () => Inject(MAPPER_TOKEN)
