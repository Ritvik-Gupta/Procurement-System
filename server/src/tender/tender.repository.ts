import { Tender, TenderHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Tender)
export class TenderRepository extends BaseRepository<Tender, TenderHollow> {
	constructor() {
		super({
			ifDefined: "Tender has already been Created",
			ifNotDefined: "No such Tender exists",
		})
	}
}
