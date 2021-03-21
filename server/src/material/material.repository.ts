import { Material, MaterialHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Material)
export class MaterialRepository extends BaseRepository<Material, MaterialHollow> {
	constructor() {
		super({
			ifDefined: "Material has already been Created",
			ifNotDefined: "No such Material exists",
		})
	}
}
