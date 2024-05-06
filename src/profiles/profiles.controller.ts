import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
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
  updateProfile(
    @Param('id') id: string,
    @Body() profileData: { firstName: string; lastName: string },
  ) {
    const { firstName, lastName } = profileData;
    return this.profilesService.updateProfile(id, firstName, lastName);
  }

  @Put(':id')
  updateProfileRelation(
    @Param('id') id: string,
    @Body()
    updateprofileData: { userId: string; userEmail: string },
  ) {
    const { userId, userEmail } = updateprofileData;
    return this.profilesService.updateProfileRelation(id, userId, userEmail);
  }

  @Delete(':id')
  deleteProfile(@Param('id') id: string) {
    return this.profilesService.deleteProfile(id);
  }
}
