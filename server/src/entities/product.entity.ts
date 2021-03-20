import { Field, ID, ObjectType } from "@nestjs/graphql"
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Material } from "./material.entity"
import { Vendor } from "./vendor.entity"

@ObjectType()
export class ProductHollow {
	@Field(() => ID)
	@PrimaryColumn({ type: "uuid" })
	creatorId: string

	@Field(() => ID)
	@PrimaryColumn({ type: "varchar" })
	materialName: string

	@Field()
	@CreateDateColumn()
	createDat: Date
}

@ObjectType()
@Entity()
export class Product extends ProductHollow {
	@Field(() => Vendor)
	@ManyToOne(() => Vendor, ({ productsCreated }) => productsCreated)
	@JoinColumn({ name: "creatorId", referencedColumnName: "userId" })
	creator: Vendor

	@Field(() => Material)
	@ManyToOne(() => Material, ({ usedForProducts }) => usedForProducts)
	@JoinColumn({ name: "materialName", referencedColumnName: "name" })
	createdMaterial: Material
}
