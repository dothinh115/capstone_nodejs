import { AuthGuard } from '@nestjs/passport';

export class TokenAuthorization extends AuthGuard('jwt') {}

export class AdminAuthorization extends AuthGuard('admin') {}

export class EditorAuthorization extends AuthGuard('editor') {}
