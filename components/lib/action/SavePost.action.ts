"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import SavePostSchema from "../schema/SavePostSchema";
import Post from "@/database/post.model";
import Saved from "@/database/saved.model";

export async function SavePost(params: { postId: string }): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    const validatedData = validateBody(params, SavePostSchema);
    const { postId } = validatedData.data;

    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const savedPost = await Saved.findOne({
      user: session.user.id,
      post: postId,
    });

    if (savedPost) {
      throw new Error("Post already saved");
    }

    await Saved.create({
      user: session.user.id,
      post: postId,
    });

    return {
      success: true,
      message: "Post save successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
