import { Strategy } from 'passport-strava';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StravaService } from '../../strava/strava.service';
import { Profile } from '../../strava/interfaces/profile.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class StravaStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly stravaService: StravaService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/strava`,
    });
  }

  async validate(accessToken: string, _, profile: Profile) {
    const user = await this.stravaService.validateUser(accessToken, profile);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.authService.signIn(user);

    return user;
  }
}
