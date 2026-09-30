import { Schema, Types, model, models, Document } from "mongoose";

interface ISaved {
  user: Types.ObjectId;
  post: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISavedDoc extends ISaved, Document {}

const savedPostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

savedPostSchema.index({ user: 1, post: 1 }, { unique: true });

const SavedPost =
  models?.SavedPost || model<ISaved>("SavedPost", savedPostSchema);
export default SavedPost;
