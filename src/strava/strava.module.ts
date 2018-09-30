import { Module } from '@nestjs/common';
import { StravaService } from './strava.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [StravaService],
  exports: [StravaService],
})
export class StravaModule {}
