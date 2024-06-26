import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
