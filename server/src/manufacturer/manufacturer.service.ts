import { UserHollow } from "$/entities"
import { UserRole } from "$/services"
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
}
