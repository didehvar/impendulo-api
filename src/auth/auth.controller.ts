import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User as UserEntity } from '../user/user.entity';
import { User } from '../user/user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('strava')
  @UseGuards(AuthGuard('strava'))
  strava(@User() user: UserEntity) {
    return this.authService.signIn(user);
  }

  @Get('jwt')
  @UseGuards(AuthGuard('jwt'))
  jwt(@User() user: UserEntity) {
    return user;
  }
}
