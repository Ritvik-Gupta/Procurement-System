import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { Proposal } from "./proposal.entity"
import { Product } from "./product.entity"
import { User } from "./user.entity"
import { Agreement } from "./agreement.entity"

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

	@Field(() => [Proposal])
	@OneToMany(() => Proposal, ({ proposer }) => proposer)
	submittedProposals: Proposal[]

	@Field(() => [Agreement])
	@OneToMany(() => Agreement, ({ withVendor }) => withVendor)
	acceptedAgreements: Agreement[]
}
