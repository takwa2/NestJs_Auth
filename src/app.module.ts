import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    ProjectsModule,
    PostsModule,
    ProfilesModule,
  ],
})
export class AppModule {}
