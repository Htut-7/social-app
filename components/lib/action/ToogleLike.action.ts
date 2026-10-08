"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import validateBody from "../validateBody";
import ToogleLikeSchema from "../schema/ToogleLikeSchema";
import User from "@/database/user.model";
import Post from "@/database/post.model";
import { actionError } from "../response";
import Vote from "@/database/vote.model";

export async function ToogleLike(params: { postId: string }): Promise<{
  success: boolean;
  data?: {
    likeCount: number;
    isLiked: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const authSession = await auth();
    if (!authSession?.user?.id) {
      throw new Error("Unauthorized");
    }

    const user = await User.findById(authSession.user.id).session(session);

    if (!user) {
      throw new Error("User not found");
    }

    const validatedData = validateBody(params, ToogleLikeSchema);
    const { postId } = validatedData.data;

    const post = await Post.findById(postId).session(session);

    if (!post) {
      throw new Error("Post not found");
    }

    const existingVote = await Vote.findOne({
      author: user._id,
      typeId: postId,
      type: "post",
    }).session(session);

    let likeCount = post.likeCount || 0;
    let isLiked = false;

    if (existingVote && existingVote.voteType === "like") {
      await Vote.findByIdAndDelete(existingVote._id).session(session);
      likeCount = Math.max(0, likeCount - 1);
      isLiked = false;
    } else {
      await Vote.create(
        [
          {
            author: user._id,
            typeId: postId,
            type: "post",
            voteType: "like",
          },
        ],
        { session }
      );
      likeCount += 1;
      isLiked = true;
    }

    post.likeCount = likeCount;
    await post.save({ session });
    await session.commitTransaction();

    return {
      success: true,
      data: {
        likeCount,
        isLiked,
      },
    };
  } catch (e) {
    await session.abortTransaction();
    return actionError(e);
  } finally {
    await session.endSession();
  }
}
