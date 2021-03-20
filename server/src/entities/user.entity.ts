import { ENV, IAuthUser, UserRole } from "$/services"
import { Field, ID, ObjectType } from "@nestjs/graphql"
import { compare, hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Manufacturer } from "./manufacturer.entity"
import { Vendor } from "./vendor.entity"

@ObjectType()
export class UserHollow implements IAuthUser {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	id: string

	@Field()
	@Column({ type: "varchar", length: 100 })
	firstName: string

	@Field()
	@Column({ type: "varchar", length: 100 })
	lastName: string

	@Field()
	@Column({ type: "varchar", length: 100, unique: true })
	email: string

	@Column({ type: "varchar" })
	password: string

	@Field()
	@Column({ type: "enum", enum: UserRole })
	role: UserRole

	@Field()
	get accessToken(): string {
		const payload: IAuthUser = { id: this.id, email: this.email, role: this.role }
		return sign(payload, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRY })
	}

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.password = await hash(this.password, ENV.HASH_SALT)
	}

	comparePassword(attemptPassword: string): Promise<boolean> {
		return compare(attemptPassword, this.password)
	}
}

@ObjectType()
@Entity()
export class User extends UserHollow {
	@OneToOne(() => Vendor, ({ asUser }) => asUser)
	asVendor: Vendor

	@OneToOne(() => Manufacturer, ({ asUser }) => asUser)
	asManufacturer: Manufacturer
}
