/**
 * 데이터베이스 설정 및 마이그레이션 스크립트
 * Prisma 설치 및 마이그레이션이 어려울 때 사용할 수 있는 대안 스크립트입니다.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

// 환경 변수에서 데이터베이스 연결 정보 가져오기
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'gst_nest',
};

// SQL 마이그레이션 파일 경로
const sqlMigrationPath = path.join(__dirname, 'manual-migration.sql');

/**
 * Prisma 마이그레이션 실행 함수
 */
async function runPrismaMigration() {
  try {
    console.log('Prisma 마이그레이션을 시작합니다...');
    
    // Prisma 초기화 (이미 초기화되어 있다면 건너뜀)
    if (!fs.existsSync(path.join(__dirname, 'prisma', 'schema.prisma'))) {
      console.log('Prisma 초기화 중...');
      execSync('npx prisma init', { stdio: 'inherit' });
    }
    
    // 마이그레이션 생성
    console.log('마이그레이션 생성 중...');
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    
    console.log('Prisma 마이그레이션이 성공적으로 완료되었습니다!');
    return true;
  } catch (error) {
    console.error('Prisma 마이그레이션 중 오류가 발생했습니다:', error.message);
    return false;
  }
}

/**
 * 수동 SQL 마이그레이션 실행 함수
 */
async function runManualMigration() {
  console.log('수동 SQL 마이그레이션을 시작합니다...');
  
  // SQL 마이그레이션 파일이 없으면 생성
  if (!fs.existsSync(sqlMigrationPath)) {
    console.log('SQL 마이그레이션 파일 생성 중...');
    
    const sqlContent = `
-- 데이터베이스 생성 (없는 경우)
CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 데이터베이스 선택
USE \`${dbConfig.database}\`;

-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`email\` VARCHAR(255) NOT NULL,
  \`password\` VARCHAR(255) NOT NULL,
  \`name\` VARCHAR(255) NULL,
  \`role\` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
  \`refreshToken\` TEXT NULL,
  \`profileImage\` TEXT NULL,
  \`lastLoginAt\` DATETIME NULL,
  \`createdAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updatedAt\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC)
);

-- 기본 관리자 계정 생성 (비밀번호: admin123)
INSERT INTO \`users\` (\`email\`, \`password\`, \`name\`, \`role\`) 
VALUES ('admin@example.com', '$2b$10$KlcQ/rAFECkuiMXsQVhGGOGlPzR9VHE2hJxRxAqAimonO6Dkd5b4e', '관리자', 'ADMIN')
ON DUPLICATE KEY UPDATE \`email\` = \`email\`;
`;
    
    fs.writeFileSync(sqlMigrationPath, sqlContent);
    console.log(`SQL 마이그레이션 파일이 생성되었습니다: ${sqlMigrationPath}`);
  }
  
  try {
    // 데이터베이스 연결
    console.log('데이터베이스에 연결 중...');
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true
    });
    
    // SQL 파일 실행
    console.log('SQL 스크립트 실행 중...');
    const sqlScript = fs.readFileSync(sqlMigrationPath, 'utf8');
    await connection.query(sqlScript);
    
    await connection.end();
    console.log('수동 SQL 마이그레이션이 성공적으로 완료되었습니다!');
    return true;
  } catch (error) {
    console.error('수동 SQL 마이그레이션 중 오류가 발생했습니다:', error.message);
    console.log(`
    ===== 수동 마이그레이션 방법 =====
    
    1. MariaDB 클라이언트를 사용하여 직접 연결하세요:
       mysql -u ${dbConfig.user} -p
       
    2. 생성된 SQL 파일을 수동으로 실행하세요:
       source ${sqlMigrationPath}
    `);
    return false;
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('데이터베이스 설정을 시작합니다...');
  
  // Prisma 마이그레이션 시도
  const prismaMigrationSuccess = await runPrismaMigration();
  
  // Prisma 마이그레이션이 실패하면 수동 마이그레이션 시도
  if (!prismaMigrationSuccess) {
    await runManualMigration();
  }
  
  console.log('데이터베이스 설정이 완료되었습니다.');
}

// 스크립트 실행
main().catch(error => {
  console.error('스크립트 실행 중 오류가 발생했습니다:', error);
  process.exit(1);
});
