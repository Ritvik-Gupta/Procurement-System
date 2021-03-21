import { Tender, TenderHollow } from "$/entities"
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"
import { TenderService } from "./tender.service"
import { TenderInput } from "./dto/tender.input"
import { ForRoles, IContext, UseAuthGuard, UserRole } from "$/services"

@Resolver(() => Tender)
export class TenderResolver {
	constructor(private readonly tenderService: TenderService) {}

	@Mutation(() => TenderHollow)
	@UseAuthGuard()
	@ForRoles(UserRole.MANUFACTURER)
	createTender(
		@Context() ctx: IContext,
		@Args("tender") tender: TenderInput
	): Promise<TenderHollow> {
		return this.tenderService.create(tender, ctx.user!.id)
	}
}
