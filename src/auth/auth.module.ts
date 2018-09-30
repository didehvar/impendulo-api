import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { StravaModule } from '../strava/strava.module';
import { StravaStrategy } from './strategies/strava.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    StravaModule,
  ],
  providers: [AuthService, JwtStrategy, StravaStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
