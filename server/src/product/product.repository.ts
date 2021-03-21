import { Product, ProductHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product, ProductHollow> {
	constructor() {
		super({ ifDefined: "Product has already been Created", ifNotDefined: "Product not found" })
	}
}
