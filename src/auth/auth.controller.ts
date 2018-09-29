import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('strava')
  @UseGuards(AuthGuard('strava'))
  protect() {
    return [];
  }
}
