/**
 * 임시 타입 선언 파일
 * 네트워크 문제로 패키지 설치가 어려울 때 사용할 수 있는 임시 타입 정의입니다.
 */

// @nestjs/common 타입 정의
declare module '@nestjs/common' {
  export const Injectable: any;
  export const Module: any;
  export const Controller: any;
  export const Get: any;
  export const Post: any;
  export const Put: any;
  export const Delete: any;
  export const Body: any;
  export const Param: any;
  export const Query: any;
  export const UseGuards: any;
  export const SetMetadata: any;
  export const Req: any;
  export const Res: any;
  export const HttpStatus: any;
  export const UnauthorizedException: any;
  export const NotFoundException: any;
  export const BadRequestException: any;
  export const ForbiddenException: any;
  export const ConflictException: any;
  export const InternalServerErrorException: any;
  export const OnModuleInit: any;
  export const OnModuleDestroy: any;
  export const CanActivate: any;
  export const ExecutionContext: any;
  export const HttpException: any;
}

// @nestjs/jwt 타입 정의
declare module '@nestjs/jwt' {
  export class JwtService {
    sign(payload: any, options?: any): string;
    verify(token: string, options?: any): any;
  }
  export const JwtModule: any;
}

// @nestjs/config 타입 정의
declare module '@nestjs/config' {
  export class ConfigService {
    get<T>(key: string, defaultValue?: T): T;
  }
  export const ConfigModule: any;
}

// @nestjs/passport 타입 정의
declare module '@nestjs/passport' {
  export const AuthGuard: any;
  export const PassportStrategy: any;
  export const PassportModule: any;
}

// passport-jwt 타입 정의
declare module 'passport-jwt' {
  export const Strategy: any;
  export const ExtractJwt: any;
}

// @nestjs/core 타입 정의
declare module '@nestjs/core' {
  export class Reflector {
    getAllAndOverride<T>(key: string, targets: any[]): T;
  }
}

// @nestjs/mapped-types 타입 정의
declare module '@nestjs/mapped-types' {
  export function PartialType<T>(classRef: T): any;
}

// @prisma/client 타입 정의 확장
declare module '@prisma/client' {
  export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
  }

  export interface PrismaClient {
    user: {
      create: (args: any) => Promise<any>;
      findMany: (args?: any) => Promise<any[]>;
      findUnique: (args: any) => Promise<any | null>;
      update: (args: any) => Promise<any>;
      delete: (args: any) => Promise<any>;
    };
  }
}
