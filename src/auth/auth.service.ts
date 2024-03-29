import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ id, email, roles }: User): Promise<string> {
    const payload: JwtPayload = {
      email,
      roles,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': roles || [],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': id,
      },
    };

    return this.jwtService.sign(payload, {
      subject: id.toString(),
    });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOneByEmail(payload.email);
  }
}
