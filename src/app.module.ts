import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles/roles.guard';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      entities: [User],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
