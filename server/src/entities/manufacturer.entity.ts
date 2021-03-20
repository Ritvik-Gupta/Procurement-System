import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { Auction } from "./auction.entity"
import { User } from "./user.entity"

@ObjectType()
export class ManufacturerHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	userId: string
}

@ObjectType()
@Entity()
export class Manufacturer extends ManufacturerHollow {
	@Field(() => User)
	@OneToOne(() => User, ({ asManufacturer }) => asManufacturer)
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	asUser: User

	@Field(() => [Auction])
	@OneToMany(() => Auction, ({ manager }) => manager)
	auctionsManaged: Auction[]
}
