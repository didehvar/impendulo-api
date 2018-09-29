import { Injectable } from '@nestjs/common';
import { UserService } from 'user/user.service';
import Profile from './interfaces/profile.interface';
import { User } from 'user/user.entity';

@Injectable()
export class StravaService {
  constructor(private readonly userService: UserService) {}

  async createUser(accessToken: string, profile: Profile): Promise<User> {
    return await this.userService.create({
      id: profile.id,
    });
  }

  async validateUser(accessToken: string, profile: Profile): Promise<User> {
    const user = await this.userService.findByStravaId(profile.id);

    if (!user) {
      return await this.createUser(accessToken, profile);
    }

    return user;
  }
}
