import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CountriesService } from './countries.service';

@Module({
  providers: [CountriesService, PrismaService],
})
export class CountriesModule {}
