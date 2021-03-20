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
import { TenderQuote } from "./tender-quote.entity"
import { Manufacturer } from "./manufacturer.entity"
import { Material } from "./material.entity"

@ObjectType()
@Unique("Unique-Tender", ["managerId", "materialName", "createDate"])
@Check("duration > 0")
export class TenderHollow {
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
export class Tender extends TenderHollow {
	@Field(() => Manufacturer)
	@ManyToOne(() => Manufacturer, ({ auctionsManaged }) => auctionsManaged)
	@JoinColumn({ name: "managerId", referencedColumnName: "userId" })
	manager: Manufacturer

	@Field(() => Material)
	@ManyToOne(() => Material, ({ heldAuctions }) => heldAuctions)
	@JoinColumn({ name: "materialName", referencedColumnName: "name" })
	forMaterial: Material

	@Field(() => [TenderQuote])
	@OneToMany(() => TenderQuote, ({ forTender }) => forTender)
	quotations: TenderQuote[]
}
