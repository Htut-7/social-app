"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import CreateCommentSchema from "../schema/CreateCommentSchema";
import Post from "@/database/post.model";
import Comment from "@/database/comment.model";
import mongoose from "mongoose";

export async function CreateComment(params: {
  postId: string;
  content: string;
}): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const authSession = await auth();
  const session = await mongoose.startSession();

  if (!authSession?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = authSession.user.id;

  try {
    session.startTransaction();
    const validatedData = validateBody(params, CreateCommentSchema);
    const { postId, content } = validatedData.data;

    const post = await Post.findById(postId).session(session);

    if (!post) {
      throw new Error("Post not found");
    }

    await Comment.create([
      {
        author: userId,
        post: postId,
        content,
      },
      { session },
    ]);

    post.commentCount = (post.commentCount || 0) + 1;
    await post.save({ session });
    await session.commitTransaction();

    return {
      success: true,
      message: "Comment created successfully",
    };
  } catch (e) {
    await session.abortTransaction();
    return actionError(e);
  } finally {
    await session.endSession();
  }
}
