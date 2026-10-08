"use server";

import Comment, { IComment } from "@/database/comment.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import GetCommentSchema from "../schema/GetCommentSchema";
import User from "@/database/user.model";

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
    const validatedData = validateBody(params, GetCommentSchema);
    const { postId } = validatedData.data;

    const comments = await Comment.find({ post: postId })
      .populate({
        path: "author",
        model: User,
        select: "_id name username image",
      })
      .sort({ createdAt: -1 });

    return {
      success: true,
      data: {
        comment: JSON.parse(JSON.stringify(comments)),
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
