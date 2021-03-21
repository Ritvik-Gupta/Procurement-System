import { Agreement, AgreementHollow } from "$/entities"
import { INormalizedPaths } from "$/services"
import { Injectable } from "@nestjs/common"
import { AgreementRepository } from "./agreement.repository"
import { AgreementInput } from "./dto/agreement.input"

@Injectable()
export class AgreementService {
	constructor(private readonly agreementRepo: AgreementRepository) {}

	create(agreement: AgreementInput): Promise<AgreementHollow> {
		return this.agreementRepo.createAndReturn(agreement)
	}

	fetchX(manufacturerId: string, fieldPaths: INormalizedPaths): Promise<Agreement[]> {
		manufacturerId
		return this.agreementRepo.getPopulatedQuery(fieldPaths).getMany()
	}
}
