import { Schema, model, models, Document } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  email: string;
  passwordHash?: string;
  image?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDoc extends IUser, Document {}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      select: false,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", userSchema);
export default User;
