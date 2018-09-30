import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User): Promise<string> {
    const payload: JwtPayload = { email: user.email };
    return this.jwtService.sign(payload, {
      subject: user.id.toString(),
    });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }
}
