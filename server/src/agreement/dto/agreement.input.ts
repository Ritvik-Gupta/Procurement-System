import { Agreement } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { IsDate, Length } from "class-validator"

@InputType()
export class AgreementInput implements Partial<Agreement> {
	@Field()
	tenderId: string

	@Field()
	vendorId: string

	@Field()
	@IsDate()
	startDate: Date

	@Field()
	@Length(1, 120)
	duration: number
}
