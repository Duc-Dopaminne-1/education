import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './models/user.model';
import { NewUserInput } from './dto/user.input';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async user(id: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: NewUserInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }
}
