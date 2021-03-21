import { Vendor, VendorHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Vendor)
export class VendorRepository extends BaseRepository<Vendor, VendorHollow> {
	constructor() {
		super({
			ifDefined: "Vendor has already been Registered",
			ifNotDefined: "No such Vendor exists",
		})
	}
}
