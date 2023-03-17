import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminCheck } from 'src/middleware/admin.middleware';
import { JwtStrategy } from 'src/middleware/jwt.strategy';
import { UsersController } from './users.controller';
import { UsersProvider } from './users.service';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [UsersController],
  providers: [UsersProvider, JwtStrategy],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminCheck).forRoutes('/users/getAllUsers');
  }
}
