import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm"
import { Tender } from "./tender.entity"
import { User } from "./user.entity"

@ObjectType()
export class ManufacturerHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	userId: string

	@Field()
	@Column({ type: "varchar" })
	companyName: string
}

@ObjectType()
@Entity()
export class Manufacturer extends ManufacturerHollow {
	@Field(() => User)
	@OneToOne(() => User, ({ asManufacturer }) => asManufacturer)
	@JoinColumn({ name: "userId", referencedColumnName: "id" })
	asUser: User

	@Field(() => [Tender])
	@OneToMany(() => Tender, ({ manager }) => manager)
	auctionsManaged: Tender[]
}
