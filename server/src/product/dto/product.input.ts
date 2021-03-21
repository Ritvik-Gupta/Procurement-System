import { ProductHollow } from "$/entities"
import { InputType, Field } from "@nestjs/graphql"
import { MinLength } from "class-validator"

@InputType()
export class ProductInput implements Partial<ProductHollow> {
	@Field()
	@MinLength(5)
	materialName: string
}
