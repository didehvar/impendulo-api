import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Profile } from './interfaces/profile.interface';
import { User } from '../user/user.entity';

@Injectable()
export class StravaService {
  constructor(private readonly usersService: UserService) {}

  async createUser(accessToken: string, profile: Profile): Promise<User> {
    return await this.usersService.create(
      new User({
        stravaId: profile.id,
        email: profile._json.email,
        firstname: profile.name.first,
        lastname: profile.name.last,
      }),
    );
  }

  async validateUser(accessToken: string, profile: Profile): Promise<User> {
    const user = await this.usersService.findByStravaId(profile.id);

    if (!user) {
      return await this.createUser(accessToken, profile);
    }

    return user;
  }
}
