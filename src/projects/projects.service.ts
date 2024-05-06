import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Project } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  //1-n relationship User-Project
  async createProject(code: string, nom: string, userId: string) {
    const project = await this.prisma.project.create({
      data: {
        code,
        nom,
        user: { connect: { id: userId } },
      },
    });
    return { message: 'Project succeffully created', project };
  }

  findAllProjects() {
    return this.prisma.project.findMany({
      select: { code: true, nom: true, userId: true },
    });
  }

  findOneProject(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
  }

  updateProject(id: number, updateProjetDto: any) {
    return `This action updates a #${id} projet`;
  }
  /*
  async removeProjectFromUser(userId: string, projectId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        projects: {
          disconnect: { id: projectId },
        },
      },
    });
    return {
      message:
        projectId + ' Project successfully deleted from ' + userId + ' list',
    };
  }*/

  async removeProject(projectId: string) {
    const projectName = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: { nom: true },
    });

    await this.prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    return { message: 'Project "' + projectName + '" successfully deleted' };
  }
}
