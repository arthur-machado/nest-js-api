import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}
  create(createTrackDto: CreateTrackDto) {
    return this.prisma.track.create({
      data: {
        name: createTrackDto.trackName,
        artistId: createTrackDto.artistId,
      },
      select: {
        id: true,
        name: true,
        updatedAt: false,
        active: false,
        artist: true,
      },
    });
  }

  findAll() {
    return `This action returns all tracks`;
  }

  findOne(id: string) {
    return this.prisma.track.findFirst({
      where: { id },
      include: {
        artist: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
