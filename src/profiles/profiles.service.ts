import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async createProfile(firstName: string, lastName: string, userId: string) {
    await this.prisma.profile.create({
      data: {
        firstName,
        lastName,
        user: {
          connect: {
            id: userId,
          },
        },
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

  async updateProfile(id: string, newfirstName: string, newlastName: string) {
    const newProfile = await this.prisma.profile.update({
      where: {
        id,
      },
      data: {
        firstName: newfirstName,
        lastName: newlastName,
      },
    });
    return {
      message: 'The content of the Post "' + id + '" successfully updated',
      newProfile,
    };
  }

  async updateProfileRelation(
    idp: string,
    newUserId: string,
    newUserEmail: string,
  ) {
    const updateProfile = await this.prisma.profile.update({
      where: {
        id: idp,
      },
      data: {
        userId: newUserId,
        userEmail: newUserEmail,
      },
    });
    return {
      message: 'the User of the Profile "' + idp + '" successfully updated',
      updateProfile,
    };
  }

  async deleteProfile(id: string) {
    await this.prisma.profile.delete({ where: { id } });
    return { message: 'Profile with id {' + id + '} successfully deleted' };
  }
}
