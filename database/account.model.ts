import { model, models, Schema, Types, Document } from "mongoose";

interface IAccount {
  user: Types.ObjectId;
  provider: string;
  providerAccountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountDoc extends IAccount, Document {}

const accountSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: ["github", "google"],
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = models?.Account || model<IAccount>("Account", accountSchema);
export default Account;
