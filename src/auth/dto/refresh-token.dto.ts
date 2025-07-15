// class-validator 패키지 임포트 방식 변경
const { IsNotEmpty, IsString } = require('class-validator');

/**
 * 리프레시 토큰 DTO
 * 토큰 갱신 요청에 사용됨
 */
export class RefreshTokenDto {
  /**
   * 리프레시 토큰
   * 새로운 액세스 토큰을 발급받기 위해 필요
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  @IsString()
  @IsNotEmpty({ message: '리프레시 토큰은 필수 입력 항목입니다.' })
  refreshToken: string;
}
