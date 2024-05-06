import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { PrismaService } from 'prisma/prisma.service';
import { disconnect } from 'process';
import { PostsDto } from './dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // n-m relationship Post-User
  async createPost(title: string, content: string, userIds: string[]) {
    const post = await this.prisma.post.create({
      data: {
        title,
        content,
        users: {
          create: userIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
    });
    return { message: 'post succefully created ', post };
  }

  /*
  async createPostForUsers(postData: PostsDto, userIds: string[]) {
    const createPostPromises = userIds.map(async (userId) => {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          posts: {
            create: postData
          },
        },
      });
    });
    await Promise.all(createPostPromises);
  }
  */

  findAllPosts() {
    return this.prisma.post.findMany();
  }

  findOnePost(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async updatePost(postId: number, postTitle: string, postContent: string) {
    const newPost = await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: postTitle,
        content: postContent,
      },
    });
    return {
      message: 'The content of the Post "' + postId + '" successfully updated',
      newPost,
    };
  }
  // delete certain users from a post and add others
  async updatePostRelations(
    idp: number,
    oldUserId: string,
    newUserIds: string[],
  ) {
    await this.prisma.postUser.deleteMany({
      where: {
        userId: oldUserId,
        postId: idp,
      },
    });

    await this.prisma.post.update({
      where: {
        id: idp,
      },
      data: {
        users: {
          create: newUserIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
    });
    return {
      message: 'the relations of the Post "' + idp + '" successfully updated',
    };
  }

  async deletePost(id: number) {
    
    const deletRecords = await this.prisma.postUser.deleteMany({
      where: {
        postId: id,

      },
    });
    await this.prisma.post.delete({
      where: {
        id,
      },
    });
    return { message: 'Post number "' + id + '" successfully deleted ' };
  }
}
