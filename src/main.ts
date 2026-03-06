import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.flatMap((error) => toTurkishValidationMessages(error));
        return new BadRequestException({
          statusCode: 400,
          message: messages.length ? messages : ['Geçersiz istek'],
          error: 'Bad Request',
        });
      },
    }),
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Takip API')
    .setDescription('Kayıt takip sistemi API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
  console.log(`Application running on: http://localhost:${process.env.PORT ?? 3001}`);
  console.log(`Swagger docs: http://localhost:${process.env.PORT ?? 3001}/api/docs`);
}

function toTurkishValidationMessages(error: ValidationError, parentPath?: string): string[] {
  const fieldPath = parentPath ? `${parentPath}.${error.property}` : error.property;
  const label = fieldPath || 'Alan';

  const currentMessages = Object.entries(error.constraints ?? {}).map(([rule, defaultMessage]) => {
    switch (rule) {
      case 'isNotEmpty':
        return `${label} boş bırakılamaz`;
      case 'isString':
        return `${label} metin olmalıdır`;
      case 'isEmail':
        return `${label} geçerli bir e-posta adresi olmalıdır`;
      case 'minLength': {
        const min = extractNumber(defaultMessage);
        return min
          ? `${label} en az ${min} karakter olmalıdır`
          : `${label} yeterli uzunlukta olmalıdır`;
      }
      case 'maxLength': {
        const max = extractNumber(defaultMessage);
        return max
          ? `${label} en fazla ${max} karakter olmalıdır`
          : `${label} çok uzun`;
      }
      case 'matches':
        return `${label} geçerli formatta olmalıdır`;
      case 'isEnum':
        return `${label} için geçerli bir değer girin`;
      case 'isDateString':
        return `${label} geçerli bir tarih formatında olmalıdır`;
      case 'isUrl':
        return `${label} geçerli bir URL olmalıdır`;
      default:
        return defaultMessage;
    }
  });

  const childMessages = (error.children ?? []).flatMap((child) => toTurkishValidationMessages(child, fieldPath));
  return [...currentMessages, ...childMessages];
}

function extractNumber(text: string): number | null {
  const match = text.match(/\d+/);
  return match ? Number(match[0]) : null;
}
bootstrap();
