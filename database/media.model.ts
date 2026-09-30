import { Schema, Types, models, model, Document } from "mongoose";

interface IMedia {
  url: string;
  publicId?: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMediaDoc extends IMedia, Document {}

const mediaSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Media = models?.Media || model<IMedia>("Media", mediaSchema);
export default Media;
