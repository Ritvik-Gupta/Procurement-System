import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { Tender, TenderQuote, Manufacturer, Material, Product, User, Vendor } from "./entities"
import { ProductModule } from "./product/product.module"
import { ENV, gqlFormatError, IContext } from "./services"
import { UserModule } from './user/user.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: ENV.DATABASE_URL,
			synchronize: !ENV.IN_PRODUCTION,
			logging: !ENV.IN_PRODUCTION,
			entities: [Manufacturer, Material, Product, User, Vendor, Tender, TenderQuote],
		}),
		GraphQLModule.forRoot({
			autoSchemaFile: ENV.IN_PRODUCTION || "./src/schema.gql",
			context: ({ req }): IContext => ({ req }),
			formatError: gqlFormatError,
			playground: !ENV.IN_PRODUCTION,
		}),
		ProductModule,
		UserModule,
		ManufacturerModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
