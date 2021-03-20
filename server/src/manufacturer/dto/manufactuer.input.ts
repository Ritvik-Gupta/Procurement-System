import { Manufacturer } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { MinLength } from "class-validator"

@InputType()
export class ManufacturerInput implements Partial<Manufacturer> {
	@Field()
	@MinLength(5)
	companyName: string
}
