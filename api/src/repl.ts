import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  return await repl(AppModule);
}
void bootstrap();
