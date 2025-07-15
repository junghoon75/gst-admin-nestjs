/**
 * 패키지 설치 스크립트
 * 네트워크 문제로 인해 패키지 설치가 어려울 때 사용할 수 있는 대안 스크립트입니다.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 필수 패키지 목록
const requiredPackages = [
  '@nestjs/common',
  '@nestjs/core',
  '@nestjs/platform-express',
  '@nestjs/config',
  '@nestjs/jwt',
  '@nestjs/passport',
  'passport',
  'passport-jwt',
  'bcrypt',
  'class-validator',
  'class-transformer',
  'joi',
  'prisma',
  '@prisma/client',
  'mysql2',
  'reflect-metadata',
  'rxjs'
];

// 개발 의존성 패키지 목록
const devPackages = [
  '@types/node',
  '@types/jest',
  '@types/bcrypt',
  '@types/passport-jwt',
  'typescript',
  'ts-node',
  'jest',
  'supertest'
];

console.log('패키지 설치를 시작합니다...');

try {
  // 프로덕션 의존성 설치
  console.log('프로덕션 의존성 설치 중...');
  execSync(`pnpm add ${requiredPackages.join(' ')}`, { stdio: 'inherit' });
  
  // 개발 의존성 설치
  console.log('개발 의존성 설치 중...');
  execSync(`pnpm add -D ${devPackages.join(' ')}`, { stdio: 'inherit' });
  
  console.log('모든 패키지가 성공적으로 설치되었습니다!');
} catch (error) {
  console.error('패키지 설치 중 오류가 발생했습니다:', error.message);
  console.log('대체 설치 방법을 시도합니다...');
  
  // 패키지 설치 실패 시 대체 방법 안내
  console.log(`
  ===== 대체 설치 방법 =====
  
  1. 각 패키지를 개별적으로 설치해보세요:
     pnpm add [패키지명]
  
  2. 글로벌 레지스트리를 변경해보세요:
     pnpm config set registry https://registry.npmmirror.com
     
  3. 오프라인 설치를 위해 패키지를 미리 다운로드하세요:
     pnpm fetch --prod
     
  4. 타입 오류가 발생하는 경우 임시 타입 선언 파일을 사용하세요:
     src/@types 디렉토리에 필요한 모듈의 타입 선언 파일을 생성하세요.
  `);
  
  // @types 디렉토리 생성
  const typesDir = path.join(__dirname, 'src', '@types');
  if (!fs.existsSync(typesDir)) {
    fs.mkdirSync(typesDir, { recursive: true });
    console.log('@types 디렉토리가 생성되었습니다.');
  }
}
