import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import {
	Check,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm"
import { Agreement } from "./agreement.entity"
import { Manufacturer } from "./manufacturer.entity"
import { Material } from "./material.entity"
import { Proposal } from "./proposal.entity"

@ObjectType()
@Unique("Unique-Tender", ["managerId", "materialName", "startDate"])
@Check(`"duration" > 0 AND "duration" <= 365`)
@Check(`"agreementDuration" > 0 AND "agreementDuration" <= 120`)
export class TenderHollow {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	tenderId: string

	@Field()
	@Column({ type: "uuid" })
	managerId: string

	@Field()
	@Column({ type: "varchar" })
	materialName: string

	@Field()
	@Column({ type: "text" })
	description: string

	@Field()
	@Column({ type: "timestamp with time zone" })
	startDate: Date

	@Field(() => Int)
	@Column({ type: "smallint" })
	duration: number

	@Field()
	get endDate(): Date {
		return new Date(this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000)
	}

	@Field()
	@Column({ type: "timestamp with time zone" })
	agreementStartDate: Date

	@Field(() => Int)
	@Column({ type: "smallint" })
	agreementDuration: number
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

	@Field(() => [Proposal])
	@OneToMany(() => Proposal, ({ forTender }) => forTender)
	proposals: Proposal[]

	@OneToOne(() => Agreement, ({ withTender }) => withTender)
	agreementFormed: Agreement
}
