"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import DeletePostSchema from "../schema/DeletePostSchema";
import Post from "@/database/post.model";

export async function DeletePost(params: { postId: string }): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const validatedData = validateBody(params, DeletePostSchema);
    const { postId } = validatedData.data;

    const post = await Post.findByIdAndDelete({
      _id: postId,
      author: session.user.id,
    });

    if (!post) {
      throw new Error("Post not found or unable to delete this post");
    }

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
