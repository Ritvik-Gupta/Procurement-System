import { Manufacturer, UserHollow } from "$/entities"
import { INormalizedPaths, UserRole } from "$/services"
import { UserInput } from "$/user/dto/user.input"
import { UserService } from "$/user/user.service"
import { Injectable } from "@nestjs/common"
import { ManufacturerInput } from "./dto/manufactuer.input"
import { ManufacturerRepository } from "./manufacturer.repository"

@Injectable()
export class ManufacturerService {
	constructor(
		private readonly manufacturerRepo: ManufacturerRepository,
		private readonly userService: UserService
	) {}

	async register(manufacturerInput: ManufacturerInput, userInput: UserInput): Promise<UserHollow> {
		const user = await this.userService.register(userInput, UserRole.MANUFACTURER)
		await this.manufacturerRepo.createAndReturn({ ...manufacturerInput, userId: user.id })
		return user
	}

	fetch(userId: string, fieldPaths: INormalizedPaths): Promise<Manufacturer | undefined> {
		return this.manufacturerRepo
			.getPopulatedQuery(fieldPaths)
			.where(`${fieldPaths.root}.userId = :userId`, { userId })
			.getOne()
	}
}
