import { Inject, Injectable, UseInterceptors } from "@nestjs/common";
import { PrismaService } from '../prisma.service';
import { User } from './models/user.model';
import { NewUserInput } from './dto/user.input';
import { CACHE_MANAGER, Cache, CacheInterceptor } from "@nestjs/cache-manager";
import { CacheTTL } from "@nestjs/common/cache";

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async user(id: string): Promise<User> {
    const saved = await this.cacheService.get<User>(id)
    if (saved) {
      return saved;
    }
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.cacheService.set(id, user, { ttl: 1000 });
    return user;
  }

  async users(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async createUser(data: NewUserInput): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    const deleted = await this.prismaService.user.delete({
      where: {
        id,
      },
    });
    await this.cacheService.del(id);
    return deleted;
  }

  async generate1mUsers(): Promise<string> {
    console.log('start loop');
    for (let i = 1; i <= 10; i++) {
      let data = [];
      for (let j = 1; j <= 100000; j++) {
        data.push({
          name: `Viet${i}${j}+1`,
          email: `viet${i}${j}+1@gmail.com`,
        });
      }
      await this.prismaService.user.createMany({
        data,
      });
      data = [];
      console.log(`done ${i}`);
    }
    return 'done';
  }
}
