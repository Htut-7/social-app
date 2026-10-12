"use server";

import { FeedPost } from "@/components/PostCard";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import GetSavedSchema from "../schema/GetSavedSchema";
import { actionError } from "../response";
import { auth } from "@/auth";
import Comment from "@/database/comment.model";
import Saved from "@/database/saved.model";
import User from "@/database/user.model";
import Post from "@/database/post.model";
import Vote from "@/database/vote.model";

export async function GetSaved(params: {
  page?: number;
  pageSize?: number;
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
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const validatedData = validateBody(params, GetSavedSchema);
  const { page = 1, pageSize = 10 } = validatedData.data;

  const skip = (Number(page) - 1) * 10;
  const limit = Number(pageSize);

  try {
    const totalSavedPosts = await Saved.countDocuments({
      user: session.user.id,
    });

    const savedPosts = await Saved.find({
      user: session.user.id,
    })
      .populate({
        path: "post",
        model: Post,
        populate: {
          path: "author",
          model: User,
          select: "_id name username image",
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const posts = savedPosts
      .map((savedPost) => savedPost.post)
      .filter((post) => post !== null);

    const postIds = posts.map((post) => post._id);

    const votes = await Vote.find({
      author: session.user.id,
      type: "post",
      typeId: { $in: postIds },
      voteType: "like",
    }).lean();

    const postWithStatus = [];

    for (const post of posts) {
      const commentCount = await Comment.countDocuments({
        post: post._id,
      });

      const isLiked = votes.some(
        (vote) => vote.typeId.toString() === post._id.toString()
      );

      postWithStatus.push({
        ...post,
        isLiked,
        isSaved: true,
        commentCount,
      });
    }

    const isNext = totalSavedPosts > skip + savedPosts.length;

    return {
      success: true,
      data: {
        post: JSON.parse(JSON.stringify(postWithStatus)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
