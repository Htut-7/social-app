"use server";

import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import CreatePostSchema from "../schema/CreatePostSchema";
import { auth } from "@/auth";
import { actionError } from "../response";
import Post from "@/database/post.model";

export async function CreatePost(params: { content: string }): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validateBody(params, CreatePostSchema);
  const { content } = validatedData.data;
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  try {
    await Post.create({
      author: session.user.id,
      content,
    });

    return {
      success: true,
      message: "Post created successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
