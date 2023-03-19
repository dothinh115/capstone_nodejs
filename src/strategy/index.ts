import { AuthGuard } from '@nestjs/passport';

export class TokenAuthorization extends AuthGuard('jwt') {}
