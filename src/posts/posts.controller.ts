import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(
    @Body() postData: { title: string; content: string; userIds: string[] },
  ) {
    const { title, content, userIds } = postData;
    return this.postsService.createPost(title, content, userIds);
  }

  @Get()
  findAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  findOnePost(@Param('id') id: string) {
    return this.postsService.findOnePost(+id);
  }

  @Put(':id')
  updatePostRelations(
    @Param('id') id: number,
    @Body() postData: { oldUserId: string; newUserIds: string[] },
  ) {
    const { oldUserId, newUserIds } = postData;
    return this.postsService.updatePostRelations(+id, oldUserId, newUserIds);
  }

  @Patch(':id')
  updatePost(
    @Param('id') id: number,
    @Body('title') postTitle: string,
    @Body('content') postContent: string,
  ) {
    return this.postsService.updatePost(+id, postTitle, postContent);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(+id);
  }
}
