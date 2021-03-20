import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Tender } from "./tender.entity"
import { Vendor } from "./vendor.entity"

@ObjectType()
@Check("amount > 0")
export class TenderQuoteHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	vendorId: string

	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	tenderId: string

	@Field(() => Int)
	@Column({ type: "integer" })
	amount: number

	@Field(() => Boolean)
	@Column({ type: "boolean" })
	deliveredByVendor: boolean
}

@ObjectType()
@Entity()
export class TenderQuote extends TenderQuoteHollow {
	@ManyToOne(() => Tender, ({ quotations }) => quotations)
	@JoinColumn({ name: "tenderId", referencedColumnName: "tenderId" })
	forTender: Tender

	@ManyToOne(() => Vendor, ({ bids }) => bids)
	@JoinColumn({ name: "vendorId", referencedColumnName: "userId" })
	vendor: Vendor
}
