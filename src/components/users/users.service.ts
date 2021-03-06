import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import { hashPassword } from '../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async create(user: CreateUserDto): Promise<any> {
    return this.prisma.user.create({
      data: {
        ...user,
        password: await hashPassword(user.password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        active: true,
        password: false,
      },
    });
  }
}
