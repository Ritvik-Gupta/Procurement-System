import { Tender, TenderHollow } from "$/entities"
import { Injectable } from "@nestjs/common"
import { TenderRepository } from "./tender.repository"
import { TenderInput } from "./dto/tender.input"
import { INormalizedPaths } from "$/services"

@Injectable()
export class TenderService {
	constructor(private readonly tenderRepo: TenderRepository) {}

	create(tender: TenderInput, managerId: string): Promise<TenderHollow> {
		return this.tenderRepo.createAndReturn({ ...tender, managerId })
	}


	fetch(tenderId: string, fieldPaths: INormalizedPaths): Promise<Tender | undefined> {
		return this.tenderRepo
			.getPopulatedQuery(fieldPaths)
			.where(`${fieldPaths.root}.tenderId = :tenderId`, { tenderId })
			.getOne()
	}
}
