import { Tender, TenderHollow } from "$/entities"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { TenderService } from "./tender.service"
import { TenderInput } from "./dto/tender.input"
import { ForRoles, IContext, INormalizedPaths, Normalize, UseAuthGuard, UserRole } from "$/services"

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

	@Query(() => Tender, { nullable: true })
	fetchTender(
		@Normalize.Paths() fieldPaths: INormalizedPaths,
		@Args("tenderId") tenderId: string
	): Promise<Tender | undefined> {
		return this.tenderService.fetch(tenderId, fieldPaths)
	}
}
