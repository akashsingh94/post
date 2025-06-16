import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from './post.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://akashtechuse:Q1myTqoaAih4dYEI@cluster0.xhvxhdt.mongodb.net/social_media',
    ),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class AppModule {}

//mongodb+srv://akashtechuse:Q1myTqoaAih4dYEI@cluster0.xhvxhdt.mongodb.net/
