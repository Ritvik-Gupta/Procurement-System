import { Proposal, ProposalHollow } from "$/entities"
import { ForRoles, IContext, UseAuthGuard, UserRole } from "$/services"
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql"
import { ProposalInput } from "./dto/proposal.input"
import { ProposalService } from "./proposal.service"

@Resolver(() => Proposal)
export class ProposalResolver {
	constructor(private readonly proposalService: ProposalService) {}

	@Mutation(() => ProposalHollow)
	@UseAuthGuard()
	@ForRoles(UserRole.VENDOR)
	createProposal(
		@Context() ctx: IContext,
		@Args("proposal") proposal: ProposalInput
	): Promise<ProposalHollow> {
		return this.proposalService.create(proposal, ctx.user!.id)
	}
}
