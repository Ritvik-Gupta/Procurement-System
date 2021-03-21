import { Tender } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { IsDate, Max, Min, MinLength } from "class-validator"

@InputType()
export class TenderInput implements Partial<Tender> {
	@Field()
	@IsDate()
	startDate: Date

	@Field()
	@Min(1)
	@Max(365)
	duration: number

	@Field()
	@IsDate()
	agreementStartDate: Date

	@Field()
	@Min(1)
	@Max(120)
	agreementDuration: number

	@Field()
	@MinLength(5)
	materialName: string

	@Field()
	@MinLength(5)
	description: string
}
