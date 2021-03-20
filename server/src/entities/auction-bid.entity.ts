import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Auction } from "./auction.entity"

@ObjectType()
@Check("amount > 0")
export class AuctionBidHollow {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	bidId: string

	@Field()
	@Column({ type: "uuid" })
	auctionId: string

	@Field(() => Int)
	@Column({ type: "integer" })
	amount: number
}

@ObjectType()
@Entity()
export class AuctionBid extends AuctionBidHollow {
	@ManyToOne(() => Auction, ({ bidsPlaced }) => bidsPlaced)
	@JoinColumn({ name: "auctionId", referencedColumnName: "auctionId" })
	forAuction: Auction
}
