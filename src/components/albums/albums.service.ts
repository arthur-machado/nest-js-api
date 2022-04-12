import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.album.findFirst({
      where: {
        id,
        active: true,
      },
      include: {
        artist: true,
        tracks: {
          orderBy: {
            trackOrder: 'asc',
          },
          select: {
            id: true,
            name: true,
            trackOrder: true,
          },
        },
      },
    });
  }
}
