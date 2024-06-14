import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { NewUserInput } from './dto/user.input';
import { Inject } from "@nestjs/common";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.userService.user(id);
  }

  @Query(() => [User])
  async users() {
    return this.userService.users();
  }

  @Mutation(() => User)
  async addUser(
    @Args('newUserInput')
    newUserInput: NewUserInput,
  ) {
    return this.userService.createUser(newUserInput);
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('id')
    id: string,
  ) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => String)
  async generate1mUsers() {
    return this.userService.generate1mUsers();
  }
}
