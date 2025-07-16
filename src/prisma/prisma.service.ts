import { Injectable } from '@nestjs/common';
// 인터페이스 대신 클래스에서 필요한 메소드만 구현
const { PrismaClient } = require('@prisma/client');

@Injectable()
export class PrismaService {
  // 타입 문제를 해결하기 위해 any 타입 사용
  private prismaClient: any;

  constructor() {
    this.prismaClient = new PrismaClient({
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  async onModuleInit() {
    await this.prismaClient.$connect();
  }

  async onModuleDestroy() {
    await this.prismaClient.$disconnect();
  }

  // users.service.ts에서 사용하는 이름과 일치시키기 위한 getter
  get users() {
    return this.prismaClient.users;
  }
}
