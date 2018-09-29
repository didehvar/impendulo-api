import { Module } from '@nestjs/common';
import { StravaService } from './strava.service';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [UsersModule],
  providers: [StravaService],
  exports: [StravaService],
})
export class StravaModule {}
