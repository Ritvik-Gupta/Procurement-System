import { Manufacturer, UserHollow } from "$/entities"
import { UserInput } from "$/user/dto/user.input"
import { Args, Mutation, Resolver } from "@nestjs/graphql"
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
}
