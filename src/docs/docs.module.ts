import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';

/**
 * API 문서화 모듈
 * NestJS 11에서 Swagger 대신 간단한 HTML 문서를 제공
 */
@Module({
  controllers: [DocsController],
})
export class DocsModule {}
