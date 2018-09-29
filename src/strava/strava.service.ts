import { Injectable } from '@nestjs/common';
import { UsersService } from 'users/users.service';
import Profile from './interfaces/profile.interface';
import { Users } from 'users/users.entity';

@Injectable()
export class StravaService {
  constructor(private readonly usersService: UsersService) {}

  async createUser(accessToken: string, profile: Profile): Promise<Users> {
    return await this.usersService.create({
      stravaId: profile.id,
    });
  }

  async validateUser(accessToken: string, profile: Profile): Promise<Users> {
    const user = await this.usersService.findByStravaId(profile.id);
    console.log(user);

    if (!user) {
      return await this.createUser(accessToken, profile);
    }

    return user;
  }
}
