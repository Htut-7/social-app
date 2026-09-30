import { Schema, Types, model, models, Document } from "mongoose";

interface IVote {
  author: Types.ObjectId;
  type: string;
  typeId: string;
  voteType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVoteDoc extends IVote, Document {}

const voteSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["post", "comment"],
    },
    typeId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    voteType: {
      type: String,
      required: true,
      enum: ["like"],
    },
  },
  { timestamps: true }
);

voteSchema.index({ author: 1, typeId: 1, type: 1 }, { unique: true });

const Vote = models?.Vote || model<IVote>("Vote", voteSchema);
export default Vote;
