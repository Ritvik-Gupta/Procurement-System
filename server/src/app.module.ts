import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { Auction, AuctionBid, Manufacturer, Material, Product, User, Vendor } from "./entities"
import { ProductModule } from "./product/product.module"
import { ENV, gqlFormatError, IContext } from "./services"

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: ENV.DATABASE_URL,
			synchronize: !ENV.IN_PRODUCTION,
			logging: !ENV.IN_PRODUCTION,
			entities: [Manufacturer, Material, Product, User, Vendor, Auction, AuctionBid],
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: ENV.IN_PRODUCTION || "./src/schema.gql",
			context: ({ req }): IContext => ({ req }),
			formatError: gqlFormatError,
			playground: !ENV.IN_PRODUCTION,
		}),
		ProductModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
