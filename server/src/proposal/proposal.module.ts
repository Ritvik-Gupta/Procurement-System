import { TenderRepository } from "$/tender/tender.repository"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProposalRepository } from "./proposal.repository"
import { ProposalResolver } from "./proposal.resolver"
import { ProposalService } from "./proposal.service"

@Module({
	imports: [TypeOrmModule.forFeature([ProposalRepository, TenderRepository])],
	providers: [ProposalService, ProposalResolver],
})
export class ProposalModule {}
