import { Product } from "$/entities"
import { INormalizedPaths, Normalize } from "$/services"
import { Query, Resolver } from "@nestjs/graphql"
import { ProductService } from "./product.service"

@Resolver(() => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Query(() => [Product])
	getAllProducts(@Normalize.Paths() fieldPath: INormalizedPaths): Promise<Product[]> {
		return this.productService.fetchAll(fieldPath)
	}
}
