import { Agreement, AgreementHollow } from "$/entities"
import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { AgreementService } from "./agreement.service"
import { AgreementInput } from "./dto/agreement.input"

@Resolver(() => Agreement)
export class AgreementResolver {
	constructor(private readonly agreementService: AgreementService) {}

	@Mutation(() => AgreementHollow)
	createAgreement(@Args("agreement") agreement: AgreementInput): Promise<AgreementHollow> {
		return this.agreementService.create(agreement)
	}
}
