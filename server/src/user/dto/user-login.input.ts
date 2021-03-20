import { UserHollow } from "$/entities"
import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, MinLength } from "class-validator"

@InputType()
export class UserLoginInput implements Partial<UserHollow> {
	@Field()
	@IsEmail()
	email: string

	@Field()
	@MinLength(5)
	password: string
}
