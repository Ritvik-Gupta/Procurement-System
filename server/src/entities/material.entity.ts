import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Auction } from "./auction.entity"
import { Product } from "./product.entity"

@ObjectType()
export class MaterialHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "varchar" })
	name: string
}

@ObjectType()
@Entity()
export class Material extends MaterialHollow {
	@Field(() => [Product])
	@OneToMany(() => Product, ({ createdMaterial }) => createdMaterial)
	usedForProducts: Product[]

	@Field(() => [Auction])
	@OneToMany(() => Auction, ({ forMaterial }) => forMaterial)
	heldAuctions: Auction[]
}
