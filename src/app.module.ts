import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { CountriesService } from './countries/countries.service';
import { CountriesModule } from './countries/countries.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ArtistsModule, CountriesModule],
  controllers: [AppController],
  providers: [AppService, CountriesService, PrismaService],
})
export class AppModule {}
