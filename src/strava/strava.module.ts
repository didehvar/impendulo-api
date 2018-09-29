import { Module } from '@nestjs/common';
import { StravaStrategy } from './strava.strategy';
import { StravaService } from './strava.service';
import { UserModule } from 'user/user.module';

@Module({
  modules: [UserModule],
  providers: [StravaStrategy, StravaService],
})
export class StravaModule {}
