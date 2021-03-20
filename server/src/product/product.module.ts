import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProductRepository } from "./product.repository"
import { ProductResolver } from "./product.resolver"
import { ProductService } from "./product.service"

@Module({
	imports: [TypeOrmModule.forFeature([ProductRepository])],
	providers: [ProductService, ProductResolver],
})
export class ProductModule {}
