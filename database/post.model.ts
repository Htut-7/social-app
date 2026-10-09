import { Schema, Types, Document, models, model } from "mongoose";

export interface IPost {
  author: Types.ObjectId;
  content: string;
  media: Types.ObjectId[];
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  upDatedAt: Date;
}

export interface IPostDoc extends IPost, Document {}

const postSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
      default: "",
    },
    media: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media",
      },
    ],

    likeCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Post = models?.Post || model<IPost>("Post", postSchema);
export default Post;
