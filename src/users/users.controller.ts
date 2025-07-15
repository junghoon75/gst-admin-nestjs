import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

/**
 * 사용자 관리 API 컨트롤러
 * 사용자 생성, 조회, 수정, 삭제 기능 제공
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 사용자 생성 API
   * @param createUserDto 사용자 생성에 필요한 데이터
   * @returns 생성된 사용자 정보
   * @roles ADMIN
   */
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * 전체 사용자 목록 조회 API
   * @returns 전체 사용자 목록
   * @roles ADMIN
   */
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * 특정 사용자 정보 조회 API
   * @param id 사용자 ID
   * @returns 해당 ID의 사용자 정보
   * @roles ADMIN, USER
   */
  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param('id', { type: 'number' }) id: string) {
    return this.usersService.findOne(+id);
  }

  /**
   * 사용자 정보 업데이트 API
   * @param id 업데이트할 사용자 ID
   * @param updateUserDto 업데이트할 사용자 정보
   * @returns 업데이트된 사용자 정보
   * @roles ADMIN
   */
  @Put(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id', { type: 'number' }) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  /**
   * 사용자 삭제 API
   * @param id 삭제할 사용자 ID
   * @returns 삭제된 사용자 정보
   * @roles ADMIN
   */
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id', { type: 'number' }) id: string) {
    return this.usersService.remove(+id);
  }
}
