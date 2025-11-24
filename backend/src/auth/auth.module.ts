import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    // TODO for candidates: Configure JWT module with proper secret and expiration
    // Currently this is incomplete and needs to be configured
    JwtModule.register({
      secret: 'CHANGE_ME_IN_PRODUCTION', // TODO: Move to environment variable
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
