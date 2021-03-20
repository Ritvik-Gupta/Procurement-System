import { UserModule } from "$/user/user.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ManufacturerRepository } from "./manufacturer.repository"
import { ManufacturerResolver } from "./manufacturer.resolver"
import { ManufacturerService } from "./manufacturer.service"

@Module({
	imports: [UserModule, TypeOrmModule.forFeature([ManufacturerRepository])],
	providers: [ManufacturerService, ManufacturerResolver],
})
export class ManufacturerModule {}
