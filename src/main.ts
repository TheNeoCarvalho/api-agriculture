import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe(
    { whitelist: true }
  ));

  app.use(passport.initialize());

  const config = new DocumentBuilder()
    .setTitle('API - Agricultor')
    .setDescription('API para gestão de produtores rurais')
    .setVersion('1.0')
    .addTag('Auth', 'Endpoints de autenticação')
    .addTag('Users', 'Endpoints de gerenciamento de usuários')
    .addTag('Producers', 'Endpoints de gerenciamento de produtores')
    .addTag('Properties', 'Endpoints de gerenciamento de propriedades')
    .addTag('Seasons', 'Endpoints de gerenciamento de safras')
    .addTag('Crops', 'Endpoints de gerenciamento de culturas')
    .addTag('Plantings', 'Endpoints de gerenciamento de plantios')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api`);
}


bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});

