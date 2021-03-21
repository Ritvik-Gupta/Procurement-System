import { Product, ProductHollow } from "$/entities"
import { ForRoles, IContext, INormalizedPaths, Normalize, UseAuthGuard, UserRole } from "$/services"
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql"
import { ProductInput } from "./dto/product.input"
import { ProductService } from "./product.service"

@Resolver(() => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Query(() => [Product])
	getAllProducts(@Normalize.Paths() fieldPath: INormalizedPaths): Promise<Product[]> {
		return this.productService.fetchAll(fieldPath)
	}

	@Mutation(() => ProductHollow)
	@UseAuthGuard()
	@ForRoles(UserRole.VENDOR)
	createProduct(
		@Context() ctx: IContext,
		@Args("product") product: ProductInput
	): Promise<ProductHollow> {
		return this.productService.create(product, ctx.user!.id)
	}
}
