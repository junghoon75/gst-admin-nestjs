<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## GST Admin API 프로젝트

이 프로젝트는 NestJS 기반의 관리자 API 서버입니다. MariaDB와 Prisma ORM을 사용하여 구현되었으며, JWT 인증 및 역할 기반 접근 제어(RBAC)를 포함합니다.

## Project setup

### 환경 설정

1. `.env` 파일 생성
```bash
$ cp .env.example .env
```

2. `.env` 파일을 열고 필요한 환경 변수 설정
```
NODE_ENV=development
PORT=3000

# MariaDB 연결 정보
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=gst_nest

# Prisma DATABASE_URL
DATABASE_URL="mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

# JWT 설정
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_TIME=3600
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_REFRESH_EXPIRATION_TIME=604800
```

### 의존성 설치

```bash
$ pnpm install
```

### 데이터베이스 설정

```bash
$ node setup-db.js
```

또는 Prisma CLI를 직접 사용할 수 있습니다:

```bash
$ npx prisma migrate dev --name init
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## API 엔드포인트

### 인증
- `POST /auth/login` - 로그인
- `POST /auth/refresh` - 토큰 갱신
- `POST /auth/logout` - 로그아웃
- `GET /auth/profile` - 현재 사용자 프로필 조회

### 사용자 관리
- `GET /users` - 모든 사용자 조회 (관리자 전용)
- `POST /users` - 새 사용자 생성 (관리자 전용)
- `GET /users/:id` - 특정 사용자 조회 (관리자 또는 본인)
- `PUT /users/:id` - 사용자 정보 업데이트 (관리자 전용)
- `DELETE /users/:id` - 사용자 삭제 (관리자 전용)

## 프로젝트 구조

```
├── src/
│   ├── @types/            # 타입 선언 파일
│   ├── auth/              # 인증 모듈
│   │   ├── dto/          # 데이터 전송 객체
│   │   ├── strategies/   # 인증 전략
│   │   ├── guards/       # 인증 가드
│   ├── common/           # 공통 기능
│   │   ├── decorators/   # 커스텀 데코레이터
│   │   ├── guards/       # 커스텀 가드
│   │   ├── helpers/      # 헬퍼 함수
│   ├── config/           # 환경 설정
│   ├── prisma/           # Prisma 모듈
│   ├── users/            # 사용자 모듈
│   │   ├── dto/          # 데이터 전송 객체
│   ├── app.module.ts     # 루트 모듈
│   ├── main.ts           # 애플리케이션 진입점
├── prisma/
│   ├── schema.prisma     # Prisma 스키마
├── .env                  # 환경 변수 (로컬)
├── .env.example          # 환경 변수 예제
├── install-deps.js       # 의존성 설치 스크립트
├── setup-db.js           # 데이터베이스 설정 스크립트
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
