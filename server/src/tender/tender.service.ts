import { TenderHollow } from "$/entities"
import { Injectable } from "@nestjs/common"
import { TenderRepository } from "./tender.repository"
import { TenderInput } from "./dto/tender.input"

@Injectable()
export class TenderService {
	constructor(private readonly TenderRepo: TenderRepository) {}

	create(tender: TenderInput, managerId: string): Promise<TenderHollow> {
		return this.TenderRepo.createAndReturn({ ...tender, managerId })
	}
}
