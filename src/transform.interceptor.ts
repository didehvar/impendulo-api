import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();

    if (request.originalUrl.includes('/strava/webhook')) {
      return call$;
    }

    return call$.pipe(map(data => ({ data })));
  }
}
