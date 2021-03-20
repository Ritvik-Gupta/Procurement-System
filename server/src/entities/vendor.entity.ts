import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { TenderQuote } from "./tender-quote.entity"
import { Product } from "./product.entity"
import { User } from "./user.entity"

@ObjectType()
export class VendorHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	userId: string

	@Field({ nullable: true })
	@Column({ type: "varchar", nullable: true })
	companyName?: string
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

	@Field(() => [TenderQuote])
	@OneToMany(() => TenderQuote, ({ vendor }) => vendor)
	bids: TenderQuote[]
}
