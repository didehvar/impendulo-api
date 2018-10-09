import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserEntity } from '../user/user.entity';
import { User } from '../user/user.decorator';
import { AuthService } from './auth.service';
import { DisableJwtGuard } from './decorators/disable-jwt-guard.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('strava')
  @UseGuards(AuthGuard('strava'))
  @DisableJwtGuard()
  strava(@User() user: UserEntity) {
    return this.authService.signIn(user);
  }
}
