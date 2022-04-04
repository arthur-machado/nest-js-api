import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CountriesService } from './countries/countries.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly countriesService: CountriesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/countries')
  async loadCountries() {
    await this.countriesService.loadCountries();
  }
}
