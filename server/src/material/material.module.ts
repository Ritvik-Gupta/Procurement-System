import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MaterialRepository } from "./material.repository"
import { MaterialResolver } from "./material.resolver"
import { MaterialService } from "./material.service"

@Module({
	imports: [TypeOrmModule.forFeature([MaterialRepository])],
	providers: [MaterialService, MaterialResolver],
})
export class MaterialModule {}
