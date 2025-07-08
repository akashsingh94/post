import { Controller, InternalServerErrorException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  /**
   * Handles the creation of a new post.
   *
   * @param data - The payload containing post data including title, content, and userId.
   * @returns An object with the status and the created post.
   * @throws InternalServerErrorException - If there is an error during post creation.
   */
  @MessagePattern('create_post')
  async handleCreatePost(
    @Payload() data: { title: string; content: string; userId: string },
  ) {
    try {
      const post = await this.postService.createPost(data);
      return { status: 'Post created', post };
    } catch (err) {
      console.error('Error creating post:', err);
      throw new InternalServerErrorException('Failed to create post');
    }
  }

  /**
   * Retrieves all posts.
   *
   * @returns An object with the status and the list of posts.
   * @throws InternalServerErrorException - If there is an error during fetching posts.
   */
  @MessagePattern('get_all_posts')
  async handleGetAllPosts() {
    try {
      const posts = await this.postService.getAllPosts();
      return { status: 'OK', posts };
    } catch (err) {
      console.error('Error fetching posts:', err);
      throw new InternalServerErrorException('Failed to get posts');
    }
  }

  /**
   * Handles the event when a comment is added to a post.
   *
   * @param data - The payload containing the postId of the post to which a comment was added.
   * @returns An object with the status indicating the comment count was updated.
   * @throws InternalServerErrorException - If there is an error during updating the comment count.
   */
  @MessagePattern('comment_added')
  async handleCommentAdded(@Payload() data: { postId: string }) {
    console.log('comment added for ', data.postId);

    try {
      await this.postService.incrementCommentCount(data.postId);
      return { status: 'Post comment count updated' };
    } catch (err) {
      console.error('Error updating comment count:', err);
      throw new InternalServerErrorException('Failed to update comment count');
    }
  }
}
