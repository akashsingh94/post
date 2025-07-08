import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  /**
   * Creates a new post in the database.
   *
   * @param data - An object containing the title and content of the post.
   * @returns A promise that resolves with the created post document.
   * @throws Error - If there is an error during post creation.
   */
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

  /**
   * Retrieves all posts from the database.
   *
   * @returns A promise that resolves with an array of post documents.
   * @throws Error - If there is an error during the retrieval of posts.
   */
  async getAllPosts(): Promise<Post[]> {
    try {
      return (await this.postModel.find().exec()) as Post[];
    } catch (error) {
      console.log('Error getting all posts', error);
      throw new Error('Error getting all posts', { cause: error });
    }
  }

  /**
   * Increments the comment count for a specific post.
   *
   * @param postId - The ID of the post for which the comment count should be incremented.
   * @returns A promise that resolves when the comment count has been incremented.
   * @throws Error - If there is an error during the update of the comment count.
   */
  async incrementCommentCount(postId: string): Promise<void> {
    await this.postModel.findByIdAndUpdate(
      postId,
      { $inc: { commentCounts: 1 } },
      { new: true },
    );
  }
}
