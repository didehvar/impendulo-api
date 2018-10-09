import {
  Controller,
  Get,
  Post,
  Query,
  Logger,
  Body,
  BadRequestException,
  Param,
  Req,
} from '@nestjs/common';
import { StravaService } from './strava.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { map, catchError } from 'rxjs/operators';
import { DisableJwtGuard } from '../auth/decorators/disable-jwt-guard.decorator';
import { throwError } from 'rxjs';

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
    console.log('Verifying webhook', query);
    return this.stravaService.verifyWebhook(query);
  }

  @Post('webhook')
  webhook(@Body() body) {
    console.log('webhook pot');
    Logger.log(body);
  }
}
