"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import DeletePostSchema from "../schema/DeletePostSchema";
import Post from "@/database/post.model";
import mongoose from "mongoose";
import Comment from "@/database/comment.model";
import Vote from "@/database/vote.model";

export async function DeletePost(params: { postId: string }): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const session = await mongoose.startSession();

  try {
    const authSession = await auth();

    if (!authSession?.user?.id) {
      throw new Error("Unauthorized");
    }

    const validatedData = validateBody(params, DeletePostSchema);
    const { postId } = validatedData.data;

    session.startTransaction();

    const post = await Post.findOne({
      _id: postId,
      author: authSession.user.id,
    }).session(session);

    if (!post) {
      throw new Error("Post not found or unable to delete this post");
    }

    const comments = await Comment.find({ post: post._id })
      .select("_id")
      .session(session);

    const commentIds = comments.map((comment) => comment._id);

    await Comment.deleteMany({ post: post._id }, { session });

    await Vote.deleteMany(
      {
        $or: [
          { type: "post", typeId: post._id },
          { type: "comment", typeId: { $in: commentIds } },
        ],
      },
      { session }
    );

    await Post.deleteOne(
      { _id: post._id, author: authSession.user.id },
      { session }
    );

    await session.commitTransaction();

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (e) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return actionError(e);
  } finally {
    await session.endSession();
  }
}
