"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import { actionError } from "../response";
import validateBody from "../validateBody";
import ToogleCommentLikeSchema from "../schema/ToogleCommentLikeSchema";
import Comment from "@/database/comment.model";
import Vote from "@/database/vote.model";

export async function ToogleCommentLike(params: {
  commentId: string;
}): Promise<{
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
  const authSession = await auth();

  if (!authSession?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    session.startTransaction();

    const validatedData = validateBody(params, ToogleCommentLikeSchema);
    const { commentId } = validatedData.data;

    const comment = await Comment.findById(commentId).session(session);
    if (!comment) {
      throw new Error("Comment not found");
    }

    const existingVote = await Vote.findOne({
      author: authSession.user.id,
      typeId: commentId,
      type: "comment",
    }).session(session);

    let likeCount = comment.likeCount || 0;
    let isLiked = false;

    if (existingVote && existingVote.voteType === "like") {
      await Vote.findByIdAndDelete(existingVote._id).session(session);

      likeCount = Math.max(0, likeCount - 1);
      isLiked = false;
    } else {
      await Vote.create(
        [
          {
            author: authSession.user.id,
            typeId: commentId,
            type: "comment",
            voteType: "like",
          },
        ],
        { session }
      );
      likeCount += 1;
      isLiked = true;
    }

    comment.likeCount = likeCount;
    await comment.save({ session });
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
