import { ReflectMetadata } from '@nestjs/common';

export const DisableJwtGuard = () => ReflectMetadata('disableJwtGuard', true);
