import { Product, ProductHollow } from "$/entities"
import { MaterialRepository } from "$/material/material.repository"
import { INormalizedPaths } from "$/services"
import { Injectable } from "@nestjs/common"
import { ProductInput } from "./dto/product.input"
import { ProductRepository } from "./product.repository"

@Injectable()
export class ProductService {
	constructor(
		private readonly productRepo: ProductRepository,
		private readonly materialRepo: MaterialRepository
	) {}

	fetchAll(fieldPath: INormalizedPaths): Promise<Product[]> {
		return this.productRepo.getPopulatedQuery(fieldPath).getMany()
	}

	async create(product: ProductInput, creatorId: string): Promise<ProductHollow> {
		await this.materialRepo.ifDefined({ name: product.materialName })
		return this.productRepo.createAndReturn({ ...product, creatorId })
	}
}
