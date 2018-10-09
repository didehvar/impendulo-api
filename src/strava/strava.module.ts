import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StravaService } from './strava.service';
import { UserModule } from '../user/user.module';
import { StravaController } from './strava.controller';
import { StravaSubscription } from './entities/strava-subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StravaSubscription]),
    UserModule,
    HttpModule,
  ],
  providers: [StravaService],
  controllers: [StravaController],
  exports: [StravaService],
})
export class StravaModule {}
