import { UserHollow } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { Length } from "class-validator"
import { UserLoginInput } from "./user-login.input"

@InputType()
export class UserInput extends UserLoginInput implements Partial<UserHollow> {
	@Field()
	@Length(5, 20)
	firstName: string

	@Field()
	@Length(5, 20)
	lastName: string
}
