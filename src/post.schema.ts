import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  //title of this post
  @Prop({ required: true })
  title: string;

  //content of this post
  @Prop({ required: true })
  content: string;

  //to which user this post belongs to
  @Prop({ required: true })
  userId: string;

  //number of comment on this post
  @Prop({ default: 0 })
  commentCounts: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
