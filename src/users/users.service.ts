import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordHelper } from '../common/helpers/password.helper';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.passwordHelper.hashPassword(
      createUserDto.password,
    );

    return this.prisma.users.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImage: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImage: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`사용자 ID ${id}를 찾을 수 없습니다`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 사용자가 존재하는지 확인
    await this.findOne(id);

    // 비밀번호가 포함된 경우 해싱 처리
    if (updateUserDto.password) {
      updateUserDto.password = await this.passwordHelper.hashPassword(
        updateUserDto.password,
      );
    }

    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    // 사용자가 존재하는지 확인
    await this.findOne(id);

    return this.prisma.users.delete({
      where: { id },
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string | null) {
    return this.prisma.users.update({
      where: { id: userId },
      data: {
        refreshToken,
        lastLoginAt: refreshToken ? new Date() : undefined,
      },
    });
  }
}
