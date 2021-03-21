import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TenderRepository } from "./tender.repository"
import { TenderResolver } from "./tender.resolver"
import { TenderService } from "./tender.service"

@Module({
	imports: [TypeOrmModule.forFeature([TenderRepository])],
	providers: [TenderService, TenderResolver],
})
export class TenderModule {}
