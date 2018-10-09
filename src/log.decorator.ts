import { createParamDecorator } from '@nestjs/common';
import { Logger } from 'pino';

export const Log = createParamDecorator(
  (data, req): Logger => {
    return req.log;
  },
);
