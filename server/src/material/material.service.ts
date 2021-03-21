import { MaterialHollow } from "$/entities"
import { Injectable } from "@nestjs/common"
import { MaterialInput } from "./dto/manufactuer.input"
import { MaterialRepository } from "./material.repository"

@Injectable()
export class MaterialService {
	constructor(private readonly materialRepo: MaterialRepository) {}

	async create(material: MaterialInput): Promise<MaterialHollow> {
		await this.materialRepo.ifNotDefined({ name: material.name })
		return this.materialRepo.createAndReturn(material)
	}
}
