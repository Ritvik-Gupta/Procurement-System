import { Proposal, ProposalHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Proposal)
export class ProposalRepository extends BaseRepository<Proposal, ProposalHollow> {
	constructor() {
		super({ ifDefined: "Proposal has already been Created", ifNotDefined: "Proposal not found" })
	}
}
