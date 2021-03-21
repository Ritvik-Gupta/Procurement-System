import { Agreement, AgreementHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Agreement)
export class AgreementRepository extends BaseRepository<Agreement, AgreementHollow> {
	constructor() {
		super({
			ifDefined: "Agreement has already been Created",
			ifNotDefined: "No such Agreement exists",
		})
	}
}
