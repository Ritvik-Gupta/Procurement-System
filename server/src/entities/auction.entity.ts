import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import {
	Check,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm"
import { AuctionBid } from "./auction-bid.entity"
import { Manufacturer } from "./manufacturer.entity"
import { Material } from "./material.entity"

@ObjectType()
@Unique("Unique-Auction", ["managerId", "materialName", "createDate"])
@Check("duration > 0")
export class AuctionHollow {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	auctionId: string

	@Field()
	@Column({ type: "uuid" })
	managerId: string

	@Field()
	@Column({ type: "varchar" })
	materialName: string

	@Field()
	@CreateDateColumn()
	createDate: Date

	@Field(() => Int)
	@Column({ type: "integer" })
	duration: number

	@Field()
	get endDate(): Date {
		return new Date(this.createDate.getTime() + this.duration * 60 * 1000)
	}
}

@ObjectType()
@Entity()
export class Auction extends AuctionHollow {
	@Field(() => Manufacturer)
	@ManyToOne(() => Manufacturer, ({ auctionsManaged }) => auctionsManaged)
	@JoinColumn({ name: "managerId", referencedColumnName: "userId" })
	manager: Manufacturer

	@Field(() => Material)
	@ManyToOne(() => Material, ({ heldAuctions }) => heldAuctions)
	@JoinColumn({ name: "materialName", referencedColumnName: "name" })
	forMaterial: Material

	@Field(() => [AuctionBid])
	@OneToMany(() => AuctionBid, ({ forAuction }) => forAuction)
	bidsPlaced: AuctionBid[]
}
