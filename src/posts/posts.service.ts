import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // n-m relationship Post-User
  async createPost(title: string, content: string, userIds: string[]) {
    const post = this.prisma.post.create({
      data: {
        title,
        content,
        //users: { connect: userIds.map((userId) => ({ id: userId })) },
      },
    });
    return { message: 'post succefully created ', post };
  }
  /*
  createPost(title: string, content: string, userIds: string[]) {
    const Post = this.prisma.post.create({
      data: {
        title,
        content,
        users: { connect: userIds.map((userId) => ({ id: userId })) },
      },
    });
    return { message: 'post succefully created ' };
  }
*/
  findAllPosts() {
    return this.prisma.post.findMany();
  }

  findOnePost(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  updatePost(id: number, updatePostDto: any) {
    return `This action updates a #${id} post`;
  }

  removePost(id: number) {
    const DeletedPost = this.prisma.post.delete({ where: { id } });
    return { message: 'Post "' + id + '" successfully deleted' };
  }
}
