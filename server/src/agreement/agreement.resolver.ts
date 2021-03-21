import { Agreement, AgreementHollow } from "$/entities"
import { IContext, INormalizedPaths, Normalize, UseAuthGuard } from "$/services"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { AgreementService } from "./agreement.service"
import { AgreementInput } from "./dto/agreement.input"

@Resolver(() => Agreement)
export class AgreementResolver {
	constructor(private readonly agreementService: AgreementService) {}

	@Mutation(() => AgreementHollow)
	createAgreement(@Args("agreement") agreement: AgreementInput): Promise<AgreementHollow> {
		return this.agreementService.create(agreement)
	}

	@Query(() => [Agreement])
	@UseAuthGuard()
	fetchX(
		@Normalize.Paths() fieldPaths: INormalizedPaths,
		@Context() ctx: IContext
	): Promise<Agreement[]> {
		return this.agreementService.fetchX(ctx.user!.id, fieldPaths)
	}
}
