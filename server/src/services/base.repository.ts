import { DeepPartial, FindConditions, Repository, SelectQueryBuilder } from "typeorm"
import { INormalizedPaths } from "./normalize.info"

export interface IRepositoryErrors {
	ifDefined: string
	ifNotDefined: string
}

export abstract class BaseRepository<T extends U, U = T> extends Repository<T> {
	constructor(private readonly repoErrors: IRepositoryErrors) {
		super()
	}

	async ifDefined(where: FindConditions<T>): Promise<U> {
		const value = await this.findOne({ where })
		if (value === undefined) throw Error(this.repoErrors.ifNotDefined)
		return value
	}

	async ifNotDefined(where: FindConditions<T>): Promise<void> {
		const value = await this.find({ where })
		if (value.length > 0) throw Error(this.repoErrors.ifDefined)
	}

	createAndReturn(entity: DeepPartial<T>): Promise<U> {
		console.log("abc")
		const user = this.create(entity)
		console.log(user)
		return this.save(user)
	}

	getPopulatedQuery(fieldPath: INormalizedPaths): SelectQueryBuilder<T> {
		const query = this.createQueryBuilder(fieldPath.root)
		fieldPath.relations.forEach(([parent, child]) => {
			query.leftJoinAndSelect(`${parent}.${child}`, `${parent}_${child}`)
		})
		return query
	}
}
