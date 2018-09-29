import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { StravaModule } from '../strava/strava.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'strava' }),
    UserModule,
    StravaModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
