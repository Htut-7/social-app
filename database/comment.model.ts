import { Schema, Types, Document, model, models } from "mongoose";

interface IComment {
  author: Types.ObjectId;
  post: Types.ObjectId;
  content: string;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDoc extends IComment, Document {}

const commentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likeCount: {
      type: Number,
      default: 0,
      min: 0,
      required: false,
    },
  },
  { timestamps: true }
);

const Comment = models?.Comment || model<IComment>("Comment", commentSchema);
export default Comment;
