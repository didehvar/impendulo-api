import { Strategy } from 'passport-strava';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StravaService } from '../../strava/strava.service';
import Profile from 'strava/interfaces/profile.interface';

@Injectable()
export class StravaStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly stravaService: StravaService) {
    super({
      clientID: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      callbackURL: process.env.STRAVA_CALLBACK,
    });
  }

  async validate(accessToken: string, _, profile: Profile) {
    const user = await this.stravaService.validateUser(accessToken, profile);
    console.log('validate', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
