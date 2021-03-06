import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { PrismaService } from 'src/prisma.service';
import { CountriesService } from 'src/components/countries/countries.service';
import { CountriesModule } from 'src/components/countries/countries.module';

@Module({
  imports: [CountriesModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, PrismaService, CountriesService],
})
export class ArtistsModule {}
