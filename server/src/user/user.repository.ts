import { User, UserHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(User)
export class UserRepository extends BaseRepository<User, UserHollow> {
	constructor() {
		super({
			ifDefined: "A User has already Registered with the email",
			ifNotDefined: "No such User exists",
		})
	}
}
