import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AgreementModule } from "./agreement/agreement.module"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ManufacturerModule } from "./manufacturer/manufacturer.module"
import { MaterialModule } from "./material/material.module"
import { ProductModule } from "./product/product.module"
import { ProposalModule } from "./proposal/proposal.module"
import { ENV, gqlFormatError, IContext } from "./services"
import { TenderModule } from "./tender/tender.module"
import { UserModule } from "./user/user.module"
import { VendorModule } from "./vendor/vendor.module"

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: ENV.DATABASE_URL,
			synchronize: !ENV.IN_PRODUCTION,
			logging: !ENV.IN_PRODUCTION,
			autoLoadEntities: true,
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
		VendorModule,
		AgreementModule,
		TenderModule,
		ProposalModule,
		MaterialModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
