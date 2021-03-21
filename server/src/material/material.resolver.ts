import { Material, MaterialHollow } from "$/entities"
import { ForRoles, UseAuthGuard, UserRole } from "$/services"
import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { MaterialInput } from "./dto/manufactuer.input"
import { MaterialService } from "./material.service"

@Resolver(() => Material)
export class MaterialResolver {
	constructor(private readonly materialService: MaterialService) {}

	@Mutation(() => MaterialHollow)
	@UseAuthGuard()
	@ForRoles(UserRole.MANUFACTURER, UserRole.VENDOR)
	createMaterial(@Args("material") material: MaterialInput): Promise<MaterialHollow> {
		return this.materialService.create(material)
	}
}
