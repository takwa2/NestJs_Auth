import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Prisma, Project } from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  //1-n relationship User-Project
  @Post(':userId')
  createProject(
    @Param('userId') userId: string,
    @Body() postData: { code: string; nom: string },
  ) {
    const { code, nom } = postData;
    return this.projectsService.createProject(code, nom, userId);
  }

  @Get()
  findAllProjects() {
    return this.projectsService.findAllProjects();
  }

  @Get(':id')
  findOneProject(@Param('id') id: string) {
    return this.projectsService.findOneProject(id);
  }

  @Patch(':id')
  updateProject(@Param('id') id: string, @Body() updateProjetDto: any) {
    return this.projectsService.updateProject(+id, updateProjetDto);
  }
  @Delete(':projectId')
  async removeProject(@Param('projectId') projectId: string) {
    await this.projectsService.removeProject(projectId);
  }
  /*
  @Delete(':id')
  removeProject(@Param('id') id: string) {
    return this.projectsService.removeProject(id);
  }
  */
}
