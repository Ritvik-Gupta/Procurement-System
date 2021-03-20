import { Product } from "$/entities"
import { INormalizedPaths } from "$/services"
import { Injectable } from "@nestjs/common"
import { ProductRepository } from "./product.repository"

@Injectable()
export class ProductService {
	constructor(private readonly productRepo: ProductRepository) {}

	fetchAll(fieldPath: INormalizedPaths): Promise<Product[]> {
		return this.productRepo.getPopulatedQuery(fieldPath).getMany()
	}
}
