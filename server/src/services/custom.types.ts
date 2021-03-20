import { Request } from "express"
import { UserRole } from "./custom.enum"

export interface IAuthUser {
	readonly id: string
	readonly email: string
	readonly role: UserRole
}

export interface IContext {
	req: Request
	user?: IAuthUser
}
