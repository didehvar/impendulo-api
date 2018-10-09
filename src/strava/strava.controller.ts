import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { StravaService } from './strava.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { DisableJwtGuard } from '../auth/decorators/disable-jwt-guard.decorator';
import { Webhook } from './interfaces/webhook.interface';

@Controller('strava')
export class StravaController {
  constructor(private readonly stravaService: StravaService) {}

  @Get('subscribe')
  @Roles('admin')
  subscribe() {
    return this.stravaService.subscribeToWebhooks('strava/webhook');
  }

  @Get('webhook')
  @DisableJwtGuard()
  challenge(@Query() query) {
    return this.stravaService.verifyWebhook(query);
  }

  @Post('webhook')
  @DisableJwtGuard()
  webhook(@Body() body: Webhook) {
    return this.stravaService.receiveWebhook(body);
  }
}
