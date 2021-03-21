import { Field, InputType } from "@nestjs/graphql"
import { MinLength } from "class-validator"

@InputType()
export class MaterialInput {
	@Field()
	@MinLength(5)
	name: string
}
