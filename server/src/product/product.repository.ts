import { Product } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {
	constructor() {
		super({ ifDefined: "Product is already Defined", ifNotDefined: "Product is not Defined" })
	}
}
