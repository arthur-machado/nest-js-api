import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { CountriesService } from './countries/countries.service';
import { CountriesModule } from './countries/countries.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [ArtistsModule, CountriesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    CountriesService,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
