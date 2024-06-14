import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { UserResolver } from "./user/user.resolver";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8080, () => {
    console.info('Server is opening on port 8080');
  });
}
bootstrap();
