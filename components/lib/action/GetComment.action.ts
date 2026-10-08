"use server";

import Comment, { IComment } from "@/database/comment.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import GetCommentSchema from "../schema/GetCommentSchema";
import User from "@/database/user.model";
import { auth } from "@/auth";
import Vote from "@/database/vote.model";

export async function GetComment(params: { postId: string }): Promise<{
  success: boolean;
  data?: {
    comment: IComment[];
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  try {
    const session = await auth();
    const validatedData = validateBody(params, GetCommentSchema);
    const { postId } = validatedData.data;

    const comments = await Comment.find({ post: postId })
      .populate({
        path: "author",
        model: User,
        select: "_id name username image",
      })
      .lean()
      .sort({ createdAt: -1 });

    const commentWithLike = comments.map((comment) => ({
      ...comment,
      isLiked: false,
    }));

    if (session?.user?.id) {
      const commentIds = comments.map((comment) => comment._id);

      const votes = await Vote.find({
        author: session?.user?.id,
        typeId: { $in: commentIds },
        voteType: "like",
        type: "comment",
      }).lean();

      for (const comment of commentWithLike) {
        comment.isLiked = votes.some(
          (vote) => vote.typeId?.toString() === comment._id.toString()
        );
      }
    }

    return {
      success: true,
      data: {
        comment: JSON.parse(JSON.stringify(commentWithLike)),
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
