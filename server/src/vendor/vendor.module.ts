import { UserModule } from "$/user/user.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { VendorRepository } from "./vendor.repository"
import { VendorResolver } from "./vendor.resolver"
import { VendorService } from "./vendor.service"

@Module({
	imports: [UserModule, TypeOrmModule.forFeature([VendorRepository])],
	providers: [VendorService, VendorResolver],
})
export class VendorModule {}
