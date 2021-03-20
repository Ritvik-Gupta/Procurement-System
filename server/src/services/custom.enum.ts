import { registerEnumType } from "@nestjs/graphql"

export enum UserRole {
	MANUFACTURER = "MANUFACTURER",
	VENDOR = "VENDOR",
}
registerEnumType(UserRole, { name: "UserRoles" })
