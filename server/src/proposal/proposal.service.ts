import { ProposalHollow } from "$/entities"
import { TenderRepository } from "$/tender/tender.repository"
import { Injectable } from "@nestjs/common"
import { ProposalInput } from "./dto/proposal.input"
import { ProposalRepository } from "./proposal.repository"

@Injectable()
export class ProposalService {
	constructor(
		private readonly proposalRepo: ProposalRepository,
		private readonly tenderRepo: TenderRepository
	) {}

	async create(proposal: ProposalInput, proposerId: string): Promise<ProposalHollow> {
		const tender = await this.tenderRepo.ifDefined({ tenderId: proposal.tenderId })
		if (new Date() >= tender.endDate) throw new Error("Tender has Expired. Proposal Denied")
		return this.proposalRepo.createAndReturn({ ...proposal, proposerId })
	}
}
