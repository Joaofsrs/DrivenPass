import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialRepository } from './credentials.repository';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialRepository],
})
export class CredentialsModule {}
