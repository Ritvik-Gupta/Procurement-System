import { User, UserHollow } from "$/entities"
import { INormalizedPaths, UserRole } from "$/services"
import { Injectable } from "@nestjs/common"
import { UserLoginInput } from "./dto/user-login.input"
import { UserInput } from "./dto/user.input"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {
	constructor(private readonly userRepo: UserRepository) {}

	fetchAll(fieldPath: INormalizedPaths): Promise<User[]> {
		return this.userRepo.getPopulatedQuery(fieldPath).getMany()
	}

	fetch(userId: string, fieldPaths: INormalizedPaths): Promise<User | undefined> {
		return this.userRepo
			.getPopulatedQuery(fieldPaths)
			.where(`${fieldPaths.root}.id = :userId`, { userId })
			.getOne()
	}

	async login({ email, password }: UserLoginInput): Promise<UserHollow> {
		const user = await this.userRepo.ifDefined({ email })
		const isSamePassword = await user.comparePassword(password)
		if (!isSamePassword) throw Error("Invalid Password")
		return user
	}

	async register(userInput: UserInput, role: UserRole): Promise<UserHollow> {
		await this.userRepo.ifNotDefined({ email: userInput.email })
		return this.userRepo.createAndReturn({ ...userInput, role })
	}
}
