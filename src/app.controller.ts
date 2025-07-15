import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 메인 애플리케이션 컨트롤러
 * 기본 루트 경로에 대한 처리를 담당
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * 기본 인사 메시지 반환 API
   * @returns 환영 메시지
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
