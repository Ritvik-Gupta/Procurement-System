import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgreementRepository } from './agreement.repository';
import { AgreementResolver } from './agreement.resolver';
import { AgreementService } from './agreement.service';

@Module({
  imports: [TypeOrmModule.forFeature([AgreementRepository])],
  providers: [AgreementService, AgreementResolver]
})
export class AgreementModule {}
