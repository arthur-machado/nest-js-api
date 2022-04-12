import { Injectable, NotFoundException } from '@nestjs/common';
import { CountriesService } from 'src/components/countries/countries.service';
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
        images: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.artist.findFirst({
      where: {
        id,
        active: true,
      },
      include: {
        country: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  findAlbums(id: string) {
    return this.prisma.artist.findFirst({
      where: {
        id,
        active: true,
      },
      include: {
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            active: true,
            cover: true,
          },
        },
      },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
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

  remove(id: string) {
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
