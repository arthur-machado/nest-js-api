import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { countries } from '../utils/countries';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async loadCountries() {
    console.log('Loading countries...');
    if ((await this.prisma.country.count()) === 0) {
      countries.forEach(async (country) => {
        console.log(`Loading ${country.name}...`);
        await this.prisma.country.create({
          data: {
            name: country.name,
            code: country.code,
          },
        });
      });
    }
  }

  async getCountries() {
    this.loadCountries();
    return await this.prisma.country.findMany();
  }
}
