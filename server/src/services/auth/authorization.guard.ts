import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { GqlExecutionContext } from "@nestjs/graphql"
import { UserRole } from "../custom.enum"
import { ENV } from "../custom.env"
import { IContext } from "../custom.types"

export const ForRoles = (...roles: UserRole[]) => SetMetadata(ENV.AUTH_ROLES_KEY, roles)

@Injectable()
export class AuthorizationGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<UserRole[] | undefined>(
			ENV.AUTH_ROLES_KEY,
			[context.getHandler(), context.getClass()]
		)
		if (requiredRoles === undefined) return true

		const ctx = GqlExecutionContext.create(context).getContext<IContext>()
		if (ctx.user === undefined) return false
		if (requiredRoles.length === 0) return true
		return requiredRoles.includes(ctx.user.role)
	}
}
