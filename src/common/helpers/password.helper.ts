import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHelper {
  private readonly saltRounds = 10;
  private readonly bcryptAvailable: boolean;

  constructor() {
    // bcrypt 사용 가능 여부 확인
    this.bcryptAvailable = this.checkBcryptAvailability();

    if (!this.bcryptAvailable) {
      console.warn('bcrypt를 사용할 수 없습니다. 대체 구현을 사용합니다.');
    }
  }

  private checkBcryptAvailability(): boolean {
    try {
      const salt = bcrypt.genSaltSync(1);
      bcrypt.hashSync('test', salt);
      return true;
    } catch (error) {
      return false;
    }
  }

  async hashPassword(password: string): Promise<string> {
    if (this.bcryptAvailable) {
      const salt = await bcrypt.genSalt(this.saltRounds);
      return bcrypt.hash(password, salt);
    } else {
      // bcrypt를 사용할 수 없는 경우 대체 구현
      return this.alternativeHash(password);
    }
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    if (this.bcryptAvailable) {
      return bcrypt.compare(plainPassword, hashedPassword);
    } else {
      // bcrypt를 사용할 수 없는 경우 대체 구현
      const hashedPlainPassword = await this.alternativeHash(plainPassword);
      return hashedPlainPassword === hashedPassword;
    }
  }

  private async alternativeHash(password: string): Promise<string> {
    // 간단한 대체 해싱 구현 (실제 프로덕션에서는 더 강력한 방법 사용 필요)
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'gst-salt-value');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
}
