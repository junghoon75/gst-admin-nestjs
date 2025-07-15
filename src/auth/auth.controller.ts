import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

/**
 * 인증 관련 API 컨트롤러
 * 로그인, 토큰 갱신, 로그아웃, 프로필 조회 기능 제공
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 사용자 로그인 API
   * @param loginDto 로그인 정보 (이메일, 비밀번호)
   * @returns 액세스 토큰과 리프레시 토큰을 포함한 응답
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * 토큰 갱신 API
   * @param refreshTokenDto 리프레시 토큰 정보
   * @returns 새로운 액세스 토큰과 리프레시 토큰을 포함한 응답
   */
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  /**
   * 로그아웃 API
   * @param req 요청 객체 (JWT 인증 필요)
   * @returns 로그아웃 성공 여부
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    return this.authService.logout(req.user.userId);
  }

  /**
   * 사용자 프로필 조회 API
   * @param req 요청 객체 (JWT 인증 필요)
   * @returns 현재 로그인한 사용자의 프로필 정보
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
