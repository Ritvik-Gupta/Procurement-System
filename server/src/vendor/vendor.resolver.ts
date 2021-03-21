import { Vendor, UserHollow } from "$/entities"
import { UserInput } from "$/user/dto/user.input"
import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { VendorInput } from "./dto/manufactuer.input"
import { VendorService } from "./vendor.service"

@Resolver(() => Vendor)
export class VendorResolver {
	constructor(private readonly vendorService: VendorService) {}

	@Mutation(() => UserHollow)
	registerVendor(
		@Args("vendor") vendorInput: VendorInput,
		@Args("user") userInput: UserInput
	): Promise<UserHollow> {
		return this.vendorService.register(vendorInput, userInput)
	}
}
