"use server";

import Post from "@/database/post.model";
import dbConnect from "../dbConnect";
import GetPostSchema from "../schema/GetPostSchema";
import validateBody from "../validateBody";
import User from "@/database/user.model";
import { actionError } from "../response";
import { FeedPost } from "@/components/PostCard";
import { auth } from "@/auth";
import Vote from "@/database/vote.model";
import Comment from "@/database/comment.model";

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
  const session = await auth();
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
      .select("_id content author likeCount commentCount createdAt updatedAt")
      .sort({ createdAt: -1, _id: 1 })
      .lean()
      .skip(skip)
      .limit(limit);

    const postWithLikes = posts.map((post) => ({
      ...post,
      isLiked: false,
      commentCount: 0,
    }));

    for (const post of postWithLikes) {
      post.commentCount = await Comment.countDocuments({ post: post._id });
    }

    if (session?.user?.id) {
      const postIds = posts.map((post) => post._id);
      const votes = await Vote.find({
        author: session.user.id,
        typeId: { $in: postIds },
        voteType: "like",
        type: "post",
      }).lean();

      for (const post of postWithLikes) {
        post.isLiked = votes.some(
          (vote) => vote.typeId.toString() === post._id.toString()
        );
      }
    }

    const isNext = totalPosts > skip + posts.length;
    return {
      success: true,
      data: {
        post: JSON.parse(JSON.stringify(postWithLikes)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
