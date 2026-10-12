import { Schema, Types, Document, model, models } from "mongoose";

export interface ISaved {
  user: Types.ObjectId;
  post: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISavedDoc extends ISaved, Document {}

const savedSchema = new Schema(
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

savedSchema.index({ user: 1, post: 1 }, { unique: true });

const Saved = models?.Saved || model<ISaved>("Saved", savedSchema);
export default Saved;
