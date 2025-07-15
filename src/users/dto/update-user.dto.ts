import { CreateUserDto } from './create-user.dto';
// class-validator 패키지 임포트 방식 변경
const { IsEmail, IsOptional, IsString, IsEnum } = require('class-validator');
import { Role } from '@prisma/client';

/**
 * 사용자 업데이트 DTO
 * @nestjs/mapped-types의 PartialType 대신 직접 속성을 정의하는 방식으로 구현
 * 모든 필드가 선택사항(업데이트하려는 필드만 전송 가능)
 */
export class UpdateUserDto implements Partial<CreateUserDto> {
  /**
   * 사용자 이름 (선택사항)
   * @example "김지원"
   */
  @IsOptional()
  @IsString()
  name?: string;

  /**
   * 사용자 이메일 (선택사항)
   * 유효한 이메일 형식이어야 함
   * @example "user@example.com"
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /**
   * 사용자 비밀번호 (선택사항)
   * @example "newpassword123"
   */
  @IsOptional()
  @IsString()
  password?: string;

  /**
   * 사용자 역할 (선택사항)
   * @example "ADMIN" 또는 "USER"
   */
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  /**
   * 프로필 이미지 URL (선택사항)
   * @example "https://example.com/profile.jpg"
   */
  @IsOptional()
  @IsString()
  profileImage?: string;
}
