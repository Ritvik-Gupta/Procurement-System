import { Manufacturer, ManufacturerHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Manufacturer)
export class ManufacturerRepository extends BaseRepository<Manufacturer, ManufacturerHollow> {
	constructor() {
		super({
			ifDefined: "Manufacturer has already been Registered",
			ifNotDefined: "No such Manufacturer exists",
		})
	}
}
