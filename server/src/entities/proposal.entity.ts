import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Tender } from "./tender.entity"
import { Vendor } from "./vendor.entity"

@ObjectType()
@Check("amount > 0")
export class ProposalHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	proposerId: string

	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	tenderId: string

	@Field(() => Int)
	@Column({ type: "integer" })
	amount: number

	@Field()
	@Column({ type: "boolean" })
	deliveredByVendor: boolean
}

@ObjectType()
@Entity()
export class Proposal extends ProposalHollow {
	@ManyToOne(() => Tender, ({ proposals }) => proposals)
	@JoinColumn({ name: "tenderId", referencedColumnName: "tenderId" })
	forTender: Tender

	@Field(() => Vendor)
	@ManyToOne(() => Vendor, ({ submittedProposals }) => submittedProposals)
	@JoinColumn({ name: "proposerId", referencedColumnName: "userId" })
	proposer: Vendor
}
