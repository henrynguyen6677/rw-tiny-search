import {NestFactory} from '@nestjs/core';
import {AppModule} from './modules/app.module';
import {ValidationPipe} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Tiny search engine')
    .setDescription('Search engine for points of interest and other')
    .setVersion('1.0')
    .addTag('search')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
