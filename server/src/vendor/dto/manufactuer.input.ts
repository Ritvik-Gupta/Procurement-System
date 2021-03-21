import { Vendor } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { IsOptional, MinLength } from "class-validator"

@InputType()
export class VendorInput implements Partial<Vendor> {
	@Field()
	@IsOptional()
	@MinLength(5)
	companyName?: string
}
