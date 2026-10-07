"use server";

import Post from "@/database/post.model";
import dbConnect from "../dbConnect";
import GetPostSchema from "../schema/GetPostSchema";
import validateBody from "../validateBody";
import User from "@/database/user.model";
import { actionError } from "../response";
import { FeedPost } from "@/components/PostCard";

export async function GetPost(params: {
  page: number;
  pageSize: number;
}): Promise<{
  success: boolean;
  data?: {
    post: FeedPost[];
    isNext: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validateBody(params, GetPostSchema);
  const { page = 1, pageSize = 10 } = validatedData.data;

  const skip = (page - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    const totalPosts = await Post.countDocuments();
    const posts = await Post.find()
      .populate({
        path: "author",
        model: User,
        select: "_id name image username",
      })
      .select("_id content author likeCount content createdAt updatedAt")
      .sort({ createdAt: -1, _id: 1 })
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
