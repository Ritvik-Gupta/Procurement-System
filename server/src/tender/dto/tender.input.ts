import { Tender } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { IsDate, Length, MinLength } from "class-validator"

@InputType()
export class TenderInput implements Partial<Tender> {
	@Field()
	@IsDate()
	startDate: Date

	@Field()
	@Length(1, 365)
	duration: number

	@Field()
	@IsDate()
	agreementStartDate: Date

	@Field()
	@Length(1, 120)
	agreementDuration: number

	@Field()
	@MinLength(5)
	materialName: string
}
