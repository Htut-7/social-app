"use server";

import Post, { IPost } from "@/database/post.model";
import dbConnect from "../dbConnect";
import GetPostSchema from "../schema/GetPostSchema";
import validateBody from "../validateBody";
import User from "@/database/user.model";
import { actionError } from "../response";
import GetPostByIdSchema from "../schema/GetPostByIdSchema";
import { auth } from "@/auth";

export async function GetPost(params: {
  page: number;
  pageSize: number;
}): Promise<{
  success: boolean;
  data?: {
    post: IPost[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validateBody(params, GetPostSchema);
  const { page = 1, pageSize = 10 } = validatedData.data;

  const skip = (Number(page) - 1) * 10;
  const limit = Number(pageSize);

  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .populate({
        path: "author",
        model: User,
        select: "_id name image username",
      })
      .select("_id content author likeCount content")
      .lean()
      .skip(skip)
      .limit(limit);

    const isNext = totalPosts > skip + posts.length;
    return {
      success: true,
      data: {
        post: JSON.parse(JSON.stringify(posts)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}

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

  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validatedData = validateBody(params, GetPostByIdSchema);
  const { postId } = validatedData.data;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.author.toString() !== session.user.id) {
      throw new Error("Cannot edit this post");
    }

    return {
      success: true,
      data: {
        post: {
          _id: post._id.toString(),
          content: post.content || "",
        },
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
