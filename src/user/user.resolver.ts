import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { NewUserInput } from './dto/user.input';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.userService.user(id);
  }

  @Mutation(() => User)
  async addUser(
    @Args('newUserInput')
    newUserInput: NewUserInput,
  ) {
    return this.userService.createUser(newUserInput);
  }
}
