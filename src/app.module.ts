import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { StravaSubscription } from './strava/entities/strava-subscription.entity';
import { StravaWebhook } from './strava/entities/strava-webhook.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      entities: [User, StravaSubscription, StravaWebhook],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
