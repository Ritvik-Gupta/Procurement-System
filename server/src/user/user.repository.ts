import { User, UserHollow } from "$/entities"
import { BaseRepository } from "$/services"
import { EntityRepository } from "typeorm"

@EntityRepository(User)
export class UserRepository extends BaseRepository<User, UserHollow> {
	constructor() {
		super({ ifDefined: "User has already been Registered", ifNotDefined: "No such User exists" })
	}
}
