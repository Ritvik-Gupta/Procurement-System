import { Manufacturer, UserHollow } from "$/entities"
import { IContext, INormalizedPaths, Normalize, UseAuthGuard } from "$/services"
import { UserInput } from "$/user/dto/user.input"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { ManufacturerInput } from "./dto/manufactuer.input"
import { ManufacturerService } from "./manufacturer.service"

@Resolver(() => Manufacturer)
export class ManufacturerResolver {
	constructor(private readonly manufacturerService: ManufacturerService) {}

	@Mutation(() => UserHollow)
	registerManufacturer(
		@Args("manufacturer") manufacturerInput: ManufacturerInput,
		@Args("user") userInput: UserInput
	): Promise<UserHollow> {
		return this.manufacturerService.register(manufacturerInput, userInput)
	}

	@Query(() => Manufacturer, { nullable: true })
	@UseAuthGuard()
	fetchManufacturer(
		@Context() context: IContext,
		@Normalize.Paths() fieldPaths: INormalizedPaths
	): Promise<Manufacturer | undefined> {
		return this.manufacturerService.fetch(context.user!.id, fieldPaths)
	}
}
