import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const disableJwtGuard = this.reflector.get<boolean>(
      'disableJwtGuard',
      context.getHandler(),
    );

    if (disableJwtGuard) {
      return true;
    }

    return super.canActivate(context);
  }
}
