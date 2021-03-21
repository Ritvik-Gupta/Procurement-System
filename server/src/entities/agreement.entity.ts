import { Field, ID, Int, ObjectType } from "@nestjs/graphql"
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm"
import { Tender } from "./tender.entity"
import { Vendor } from "./vendor.entity"

@ObjectType()
@Check("duration > 0 AND duration <= 365")
export class AgreementHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	tenderId: string

	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	vendorId: string

	@Field()
	@Column({ type: "timestamp with time zone" })
	startDate: Date

	@Field(() => Int)
	@Column({ type: "smallint" })
	duration: number

	@Field()
	get endDate(): Date {
		return new Date(this.startDate.getTime() + this.duration * 30 * 24 * 60 * 60 * 1000)
	}
}

@ObjectType()
@Entity()
export class Agreement extends AgreementHollow {
	@OneToOne(() => Tender, ({ agreementFormed }) => agreementFormed)
	@JoinColumn({ name: "tenderId", referencedColumnName: "tenderId" })
	withTender: Tender

	@ManyToOne(() => Vendor, ({ acceptedAgreements }) => acceptedAgreements)
	@JoinColumn({ name: "vendorId", referencedColumnName: "userId" })
	withVendor: Vendor
}
