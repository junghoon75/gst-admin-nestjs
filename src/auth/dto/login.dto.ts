// class-validator 패키지 임포트 방식 변경
const { IsEmail, IsNotEmpty, IsString, MinLength } = require('class-validator');

/**
 * 로그인 DTO
 * 사용자 로그인 요청에 사용됨
 */
export class LoginDto {
  /**
   * 사용자 이메일
   * 유효한 이메일 형식이어야 함
   * @example "user@example.com"
   */
  @IsEmail()
  @IsNotEmpty({ message: '이메일은 필수 입력 항목입니다.' })
  email: string;

  /**
   * 사용자 비밀번호
   * 최소 6자 이상이어야 함
   * @example "password123"
   */
  @IsString()
  @IsNotEmpty({ message: '비밀번호는 필수 입력 항목입니다.' })
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;
}
