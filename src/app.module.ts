import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './components/artists/artists.module';
import { CountriesService } from './components/countries/countries.service';
import { CountriesModule } from './components/countries/countries.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './components/auth/jwt-auth.guard';
import { TracksModule } from './components/tracks/tracks.module';

@Module({
  imports: [ArtistsModule, CountriesModule, AuthModule, UsersModule, TracksModule],
  controllers: [AppController],
  providers: [
    AppService,
    CountriesService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
