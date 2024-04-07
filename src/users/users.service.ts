import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyUser(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const decodedUser = req.user as { id: string; email: string };

    if (!user) {
      throw new NotFoundException();
    }

    if (user.id !== decodedUser.id) {
      throw new ForbiddenException('Access denied');
    }
    delete user.hashedPassword;
    return { user };
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      select: { id: true, email: true },
    });
  }
}
