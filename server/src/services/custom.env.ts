import dotenv from "dotenv"

dotenv.config()

export namespace ENV {
	export const PORT = process.env.PORT!
	export const JWT_SECRET = process.env.JWT_SECRET!
	export const JWT_EXPIRY = process.env.JWT_EXPIRY!
	export const HASH_SALT = parseInt(process.env.HASH_SALT!)
	export const DATABASE_URL = process.env.DATABASE_URL!

	export const VALIDATION_ERROR_KEY = "VALIDATION_ERROR"
	export const AUTH_ROLES_KEY = "roles"

	export const NODE_ENV = process.env.NODE_ENV
	export const IN_PRODUCTION = NODE_ENV === "production"
}
