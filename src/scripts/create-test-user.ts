import { PasswordHelper } from '../common/helpers/password.helper';
// PrismaClient를 값으로 가져오기 위해 require 사용
const { PrismaClient } = require('@prisma/client');

async function createTestUser() {
  const prisma = new PrismaClient();
  const passwordHelper = new PasswordHelper();
  
  try {
    const testUser = {
      email: 'admin@example.com',
      password: 'gs123123', // 실제 사용 시에는 더 강력한 비밀번호를 사용하세요
      name: '관리자',
      role: 'ADMIN',
    };

    // 비밀번호 해시화
    const hashedPassword = await passwordHelper.hashPassword(testUser.password);

    // 사용자 생성
    const user = await prisma.users.create({
      data: {
        email: testUser.email,
        password: hashedPassword,
        name: testUser.name,
        role: testUser.role,
      },
    });

    console.log('관리자가 성공적으로 생성되었습니다:');
    console.log(`ID: ${user.id}`);
    console.log(`이메일: ${user.email}`);
    console.log(`이름: ${user.name}`);
    console.log(`역할: ${user.role}`);
    console.log('생성일: ', user.createdAt);
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('이미 존재하는 이메일입니다.');
    } else {
      console.error('사용자 생성 중 오류가 발생했습니다:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser().catch(console.error);
