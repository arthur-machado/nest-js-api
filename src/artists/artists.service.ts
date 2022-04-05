import { Injectable, NotFoundException } from '@nestjs/common';
import { CountriesService } from 'src/countries/countries.service';
import { PrismaService } from 'src/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    private prisma: PrismaService,
    private countriesService: CountriesService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    await this.countriesService.loadCountries();
    return this.prisma.artist.create({
      data: {
        ...createArtistDto,
      },
      include: {
        country: true,
      },
    });
  }

  findAll() {
    return this.prisma.artist.findMany({
      include: {
        country: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.artist.findFirst({
      where: {
        id,
        active: true,
      },
      include: {
        country: true,
      },
    });
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findFirst({
      where: {
        id,
        active: true,
      },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return this.prisma.artist.update({
      data: {
        ...updateArtistDto,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
      include: {
        country: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.artist.update({
      data: {
        active: false,
      },
      where: {
        id,
      },
    });
  }
}
