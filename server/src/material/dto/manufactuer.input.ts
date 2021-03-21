import { Material } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { MinLength } from "class-validator"

@InputType()
export class MaterialInput implements Partial<Material> {
	@Field()
	@MinLength(5)
	name: string
}
