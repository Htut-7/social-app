"use server";

import Post from "@/database/post.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import GetPostByIdSchema from "../schema/GetPostByIdSchema";
import validateBody from "../validateBody";

export async function GetPostById(params: { postId: string }): Promise<{
  success: boolean;
  data?: {
    post: {
      _id: string;
      content: string;
    };
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validateBody(params, GetPostByIdSchema);
  const { postId } = validatedData.data;

  try {
    const posts = await Post.findById(postId);
    if (!posts) {
      throw new Error("Post not found");
    }

    return {
      success: true,
      data: {
        post: {
          _id: posts.id,
          content: posts.content || "",
        },
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
