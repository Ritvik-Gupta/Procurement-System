import { UserHollow } from "$/entities"
import { UserRole } from "$/services"
import { UserInput } from "$/user/dto/user.input"
import { UserService } from "$/user/user.service"
import { Injectable } from "@nestjs/common"
import { VendorInput } from "./dto/manufactuer.input"
import { VendorRepository } from "./vendor.repository"

@Injectable()
export class VendorService {
	constructor(
		private readonly VendorRepo: VendorRepository,
		private readonly userService: UserService
	) {}

	async register(VendorInput: VendorInput, userInput: UserInput): Promise<UserHollow> {
		const user = await this.userService.register(userInput, UserRole.VENDOR)
		await this.VendorRepo.createAndReturn({ ...VendorInput, userId: user.id })
		return user
	}
}
