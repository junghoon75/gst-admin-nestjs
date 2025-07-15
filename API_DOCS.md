# GST Admin API 문서

## 개요
이 문서는 GST Admin API의 엔드포인트와 사용 방법을 설명합니다.

## 인증 API (AuthController)

### 로그인 API
- **URL**: `/auth/login`
- **Method**: `POST`
- **설명**: 이메일과 비밀번호를 사용하여 로그인하고 JWT 토큰을 발급받습니다.
- **요청 본문 (LoginDto)**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **응답**:
  - `200 OK`: 로그인 성공
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - `401 Unauthorized`: 인증 실패

### 토큰 갱신 API
- **URL**: `/auth/refresh`
- **Method**: `POST`
- **설명**: 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받습니다.
- **요청 본문 (RefreshTokenDto)**:
  ```json
  {
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **응답**:
  - `200 OK`: 토큰 갱신 성공
    ```json
    {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - `401 Unauthorized`: 유효하지 않은 리프레시 토큰

### 로그아웃 API
- **URL**: `/auth/logout`
- **Method**: `POST`
- **설명**: 사용자 로그아웃을 처리합니다.
- **인증**: JWT 토큰 필요 (Authorization 헤더)
- **응답**:
  - `200 OK`: 로그아웃 성공
  - `401 Unauthorized`: 인증되지 않은 사용자

### 프로필 조회 API
- **URL**: `/auth/profile`
- **Method**: `GET`
- **설명**: 현재 로그인한 사용자의 프로필 정보를 조회합니다.
- **인증**: JWT 토큰 필요 (Authorization 헤더)
- **응답**:
  - `200 OK`: 프로필 조회 성공
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "name": "김지원",
      "role": "ADMIN",
      "profileImage": "https://example.com/profile.jpg"
    }
    ```
  - `401 Unauthorized`: 인증되지 않은 사용자

## 사용자 관리 API (UsersController)

### 사용자 생성 API
- **URL**: `/users`
- **Method**: `POST`
- **설명**: 새로운 사용자를 생성합니다.
- **인증**: JWT 토큰 필요 (Authorization 헤더)
- **권한**: ADMIN 역할 필요
- **요청 본문 (CreateUserDto)**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "김지원",
    "role": "ADMIN",
    "profileImage": "https://example.com/profile.jpg"
  }
  ```
- **응답**:
  - `201 Created`: 사용자 생성 성공
  - `400 Bad Request`: 잘못된 요청
  - `401 Unauthorized`: 인증되지 않은 사용자
  - `403 Forbidden`: 권한 없음

### 전체 사용자 목록 조회 API
- **URL**: `/users`
- **Method**: `GET`
- **설명**: 모든 사용자 목록을 조회합니다.
- **인증**: JWT 토큰 필요 (Authorization 헤더)
- **권한**: ADMIN 역할 필요
- **응답**:
  - `200 OK`: 사용자 목록 조회 성공
    ```json
    [
      {
        "id": 1,
        "email": "user1@example.com",
        "name": "김지원",
        "role": "ADMIN",
        "profileImage": "https://example.com/profile1.jpg"
      },
      {
        "id": 2,
        "email": "user2@example.com",
        "name": "이민수",
        "role": "USER",
        "profileImage": "https://example.com/profile2.jpg"
      }
    ]
    ```
  - `401 Unauthorized`: 인증되지 않은 사용자
  - `403 Forbidden`: 권한 없음

### 특정 사용자 정보 조회 API
- **URL**: `/users/:id`
- **Method**: `GET`
- **설명**: 특정 ID의 사용자 정보를 조회합니다.
- **인증**: JWT 토큰 필요 (Authorization 헤더)
- **권한**: ADMIN 역할 또는 본인 정보 조회 시 USER 역할
- **파라미터**:
  - `id`: 사용자 ID (숫자)
- **응답**:
  - `200 OK`: 사용자 조회 성공
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "name": "김지원",
      "role": "ADMIN",
      "profileImage": "https://example.com/profile.jpg"
    }
    ```
  - `401 Unauthorized`: 인증되지 않은 사용자
  - `403 Forbidden`: 권한 없음
  - `404 Not Found`: 사용자를 찾을 수 없음

### 사용자 정보 업데이트 API
- **URL**: `/users/:id`
- **Method**: `PUT`
- **설명**: 특정 ID의 사용자 정보를 업데이트합니다.
- **인증**: JWT 토큰 필요 (Authorization 헤더)
- **권한**: ADMIN 역할 필요
- **파라미터**:
  - `id`: 사용자 ID (숫자)
- **요청 본문 (UpdateUserDto)**:
  ```json
  {
    "email": "updated@example.com",
    "password": "newpassword123",
    "name": "김지원",
    "role": "ADMIN",
    "profileImage": "https://example.com/new-profile.jpg"
  }
  ```
  (모든 필드는 선택사항입니다. 업데이트하려는 필드만 포함하면 됩니다.)
- **응답**:
  - `200 OK`: 사용자 업데이트 성공
  - `400 Bad Request`: 잘못된 요청
  - `401 Unauthorized`: 인증되지 않은 사용자
  - `403 Forbidden`: 권한 없음
  - `404 Not Found`: 사용자를 찾을 수 없음

### 사용자 삭제 API
- **URL**: `/users/:id`
- **Method**: `DELETE`
- **설명**: 특정 ID의 사용자를 삭제합니다.
- **인증**: JWT 토큰 필요 (Authorization 헤더)
- **권한**: ADMIN 역할 필요
- **파라미터**:
  - `id`: 사용자 ID (숫자)
- **응답**:
  - `200 OK`: 사용자 삭제 성공
  - `401 Unauthorized`: 인증되지 않은 사용자
  - `403 Forbidden`: 권한 없음
  - `404 Not Found`: 사용자를 찾을 수 없음

## 메인 애플리케이션 API (AppController)

### 기본 인사 메시지 API
- **URL**: `/`
- **Method**: `GET`
- **설명**: 애플리케이션의 기본 인사 메시지를 반환합니다.
- **응답**:
  - `200 OK`: 성공 (문자열 메시지)

## 인증 및 권한

### JWT 인증
- API 요청 시 Authorization 헤더에 Bearer 토큰을 포함해야 합니다.
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

### 역할 기반 접근 제어
- `ADMIN`: 모든 API에 접근 가능
- `USER`: 제한된 API에만 접근 가능 (자신의 프로필 조회 등)

## 데이터 모델

### User 모델
```typescript
{
  id: number;
  email: string;
  password: string; // 해시된 비밀번호, 응답에서는 제외됨
  name?: string;
  role: 'ADMIN' | 'USER';
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## DTO 클래스

### LoginDto
```typescript
{
  email: string; // 이메일 형식이어야 함
  password: string; // 비어있지 않아야 함
}
```

### RefreshTokenDto
```typescript
{
  refreshToken: string; // 비어있지 않아야 함
}
```

### CreateUserDto
```typescript
{
  email: string; // 이메일 형식이어야 함
  password: string; // 비어있지 않아야 함
  name?: string;
  role?: 'ADMIN' | 'USER';
  profileImage?: string;
}
```

### UpdateUserDto
```typescript
{
  email?: string; // 이메일 형식이어야 함
  password?: string;
  name?: string;
  role?: 'ADMIN' | 'USER';
  profileImage?: string;
}
```
