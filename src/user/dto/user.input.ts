import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class NewUserInput implements Prisma.UserCreateInput {
  @Field()
  name: string;

  @Field()
  email: string;
}
