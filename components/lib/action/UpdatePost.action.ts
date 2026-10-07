"use server";

import Post from "@/database/post.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import UpdatePostSchema from "../schema/UpdatePostSchema";
import validateBody from "../validateBody";
import { auth } from "@/auth";

export async function UpdatePost(params: {
  postId: string;
  content: string;
}): Promise<{
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

    const validatedData = validateBody(params, UpdatePostSchema);
    const { postId, content } = validatedData.data;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.author.toString() !== session.user.id) {
      throw new Error("Cannot update Post");
    }

    post.content = content;
    await post.save();

    return {
      success: true,
      message: "Post updated successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
