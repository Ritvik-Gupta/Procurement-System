import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Tender } from "./tender.entity"
import { Vendor } from "./vendor.entity"

@ObjectType()
@Check("amount > 0")
export class TenderQuoteHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	auctioneerId: string

	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	auctionId: string

	@Field(() => Int)
	@Column({ type: "integer" })
	amount: number
}

@ObjectType()
@Entity()
export class TenderQuote extends TenderQuoteHollow {
	@ManyToOne(() => Tender, ({ quotations }) => quotations)
	@JoinColumn({ name: "auctionId", referencedColumnName: "auctionId" })
	forTender: Tender

	@ManyToOne(() => Vendor, ({ bids }) => bids)
	@JoinColumn({ name: "auctioneerId", referencedColumnName: "userId" })
	vendor: Vendor
}
