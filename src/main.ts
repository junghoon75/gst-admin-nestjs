// NestJS 11 버전에 맞게 import 방식 수정
const { NestFactory } = require('@nestjs/core');
const { ValidationPipe } = require('@nestjs/common');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors();

  // 전역 파이프 설정 - 유효성 검증을 위함
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 자체를 막음
      transform: true, // 요청 데이터를 DTO 인스턴스로 자동 변환
    }),
  );

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('GST Admin API')
    .setDescription('GST 관리자 API 문서')
    .setVersion('1.0')
    .addTag('users', '사용자 관리 API')
    .addTag('auth', '인증 관리 API')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'JWT 토큰을 입력하세요',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🔵 애플리케이션이 실행 중입니다: ${await app.getUrl()}`);
  console.log(
    `🔵 API 문서는 다음 주소에서 확인 가능합니다: ${await app.getUrl()}/api`,
  );
}
bootstrap();
