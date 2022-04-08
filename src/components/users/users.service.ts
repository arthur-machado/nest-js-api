import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import { hashPassword } from '../../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<any> {
    return await this.prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        role: true,
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
        username: true,
        email: true,
        createdAt: true,
        role: true,
        updatedAt: true,
        active: true,
        password: false,
      },
    });
  }
}
