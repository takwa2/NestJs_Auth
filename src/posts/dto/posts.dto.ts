import { IsNotEmpty } from 'class-validator';

export class PostsDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
}
