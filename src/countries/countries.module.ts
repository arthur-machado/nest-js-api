import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

@Module({
  providers: [CountriesService, PrismaService],
  controllers: [CountriesController],
})
export class CountriesModule {}
