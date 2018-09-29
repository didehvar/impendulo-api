import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('strava')
  @UseGuards(AuthGuard('strava'))
  protect(@Req() request) {
    console.log(request);
    return [];
  }
}
