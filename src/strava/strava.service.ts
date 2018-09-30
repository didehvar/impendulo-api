import { Injectable } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { Profile } from './interfaces/profile.interface';
import { User } from 'user/user.entity';

@Injectable()
export class StravaService {
  constructor(private readonly usersService: UserService) {}

  async createUser(accessToken: string, profile: Profile): Promise<User> {
    const user = new User();

    user.stravaId = profile.id;
    user.email = profile._json.email;
    user.firstname = profile.name.first;
    user.lastname = profile.name.last;

    return await this.usersService.create(user);
  }

  async validateUser(accessToken: string, profile: Profile): Promise<User> {
    const user = await this.usersService.findByStravaId(profile.id);
    console.log(user);

    if (!user) {
      return await this.createUser(accessToken, profile);
    }

    return user;
  }
}
