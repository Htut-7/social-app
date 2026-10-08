"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import CreateCommentSchema from "../schema/CreateCommentSchema";
import Post from "@/database/post.model";
import Comment from "@/database/comment.model";

export async function CreateComment(params: {
  postId: string;
  content: string;
}): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  try {
    const validatedData = validateBody(params, CreateCommentSchema);
    const { postId, content } = validatedData.data;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    await Comment.create({
      author: userId,
      postId,
      content,
    });

    return {
      success: true,
      message: "Comment created successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
