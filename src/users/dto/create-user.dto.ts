// class-validator 패키지와 Swagger 데코레이터 임포트 방식 변경
const {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} = require('class-validator');
const { ApiProperty } = require('@nestjs/swagger');
import { Role } from '@prisma/client';

/**
 * 사용자 생성 DTO
 * 새로운 사용자를 생성하기 위한 데이터 형식
 */
export class CreateUserDto {
  /**
   * 사용자 이메일
   * 유효한 이메일 형식이어야 함
   * @example "user@example.com"
   */
  @ApiProperty({
    description: '사용자 이메일',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  email: string;

  /**
   * 사용자 비밀번호
   * 최소 6자 이상이어야 함
   * @example "password123"
   */
  @ApiProperty({
    description: '사용자 비밀번호 (최소 6자 이상)',
    example: 'password123',
    required: true,
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;

  /**
   * 사용자 이름 (선택사항)
   * @example "김지원"
   */
  @ApiProperty({
    description: '사용자 이름',
    example: '김지원',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * 사용자 역할 (선택사항)
   * @example "ADMIN" 또는 "USER"
   */
  @ApiProperty({
    description: '사용자 역할',
    example: 'USER',
    enum: Role,
    required: false,
  })
  @IsEnum(Role, { message: '유효한 역할이 아닙니다.' })
  @IsOptional()
  role?: Role;

  /**
   * 프로필 이미지 URL (선택사항)
   * @example "https://example.com/profile.jpg"
   */
  @ApiProperty({
    description: '프로필 이미지 URL',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  profileImage?: string;
}
