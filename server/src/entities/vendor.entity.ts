import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { Product } from "./product.entity"
import { User } from "./user.entity"

@ObjectType()
export class VendorHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	userId: string
}

@ObjectType()
@Entity()
export class Vendor extends VendorHollow {
	@Field(() => User)
	@OneToOne(() => User, ({ asVendor }) => asVendor)
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	asUser: User

	@Field(() => [Product])
	@OneToMany(() => Product, ({ creator }) => creator)
	productsCreated: Product[]
}
