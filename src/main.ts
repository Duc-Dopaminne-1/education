import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaService } from './prisma.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalFilters(new HttpExceptionFilter());

  if (module && module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(8080, () => {
    console.info('Server is opening on port 8080');
  });
}
bootstrap();
