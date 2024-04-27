import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post(':userId')
  createProfile(
    @Param('userId') userId: string,
    @Body() postData: { firstName: string; lastName: string },
  ) {
    const { firstName, lastName } = postData;
    return this.profilesService.createProfile(firstName, lastName, userId);
  }

  @Get()
  findAllProfiles() {
    return this.profilesService.findAllProfiles();
  }

  @Get(':id')
  findOneProfile(@Param() params: { id: string }) {
    return this.profilesService.findOneProfile(params.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: any) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string) {
    return this.profilesService.deleteProfile(id);
  }
}
