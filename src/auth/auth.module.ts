import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { StravaModule } from '../strava/strava.module';
import { StravaStrategy } from './strategies/strava.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'strava' }),
    StravaModule,
  ],
  providers: [StravaStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
