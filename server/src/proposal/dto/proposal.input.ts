import { ProposalHollow } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { Min } from "class-validator"

@InputType()
export class ProposalInput implements Partial<ProposalHollow> {
	@Field()
	tenderId: string

	@Field()
	@Min(1)
	amount: number

	@Field()
	deliveredByVendor: boolean
}
