import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { profileDto } from './dto/profiles.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    private prisma: PrismaService,
    private user: UsersService,
  ) {}

  async createProfile(firstName: string, lastName: string, userId: string) {
    const profile = await this.prisma.profile.create({
      data: {
        firstName,
        lastName,
        user: { connect: { id: userId } },
      },
    });
    return {
      message:
        'Profile "' + firstName + ' ' + lastName + '" created succefully  ',
    };
  }

  findAllProfiles() {
    return this.prisma.profile.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        userEmail: true,
      },
    });
  }

  async findOneProfile(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException();
    }
    return { profile };
  }

  update(id: string, updateProfileDto: any) {
    return `This action updates a #${id} profile`;
  }

  async deleteProfile(id: string) {
    await this.prisma.profile.delete({ where: { id } });
    return { message: 'Profile with id {' + id + '} successfully deleted' };
  }
}
