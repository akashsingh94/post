import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(data: { title: string; content: string }): Promise<Post> {
    try {
      const createdPost = new this.postModel(data);
      const result = await createdPost.save();
      return result as Post;
    } catch (error) {
      console.log('Error creating post', error);
      throw new Error('Error creating post', { cause: error });
    }
  }

  async getAllPosts(): Promise<Post[]> {
    try {
      return (await this.postModel.find().exec()) as Post[];
    } catch (error) {
      console.log('Error getting all posts', error);
      throw new Error('Error getting all posts', { cause: error });
    }
  }

  async incrementCommentCount(postId: string): Promise<void> {
    await this.postModel.findByIdAndUpdate(
      postId,
      { $inc: { commentCounts: 1 } },
      { new: true },
    );
  }
}
