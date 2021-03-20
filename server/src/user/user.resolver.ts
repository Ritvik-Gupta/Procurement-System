import { User, UserHollow } from "$/entities"
import { IContext, INormalizedPaths, Normalize, UseAuthGuard } from "$/services"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { UserLoginInput } from "./dto/user-login.input"
import { UserService } from "./user.service"

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User])
	getAllUsers(@Normalize.Paths() fieldPath: INormalizedPaths): Promise<User[]> {
		return this.userService.fetchAll(fieldPath)
	}

	@Query(() => User, { nullable: true })
	@UseAuthGuard()
	currentUser(
		@Context() context: IContext,
		@Normalize.Paths() fieldPaths: INormalizedPaths
	): Promise<User | undefined> {
		return this.userService.fetch(context.user!.id, fieldPaths)
	}

	@Mutation(() => UserHollow)
	login(@Args("loginInput") loginInput: UserLoginInput): Promise<UserHollow> {
		return this.userService.login(loginInput)
	}
}
