"use server";

import Post, { IPost } from "@/database/post.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import GetPostByIdSchema from "../schema/GetPostByIdSchema";
import validateBody from "../validateBody";
import User, { IUser } from "@/database/user.model";
import Comment from "@/database/comment.model";

type PostDetails = Pick<IPost, "content" | "likeCount" | "commentCount"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  author:
    | (Pick<IUser, "name" | "username" | "image"> & {
        _id: string;
      })
    | null;
};

export async function GetPostById(params: { postId: string }): Promise<{
  success: boolean;
  data?: {
    post: PostDetails;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validateBody(params, GetPostByIdSchema);
  const { postId } = validatedData.data;

  try {
    const posts = await Post.findById(postId).populate({
      path: "author",
      model: User,
      select: "_id name username image",
    });
    if (!posts) {
      throw new Error("Post not found");
    }

    const commentCount = await Comment.countDocuments({ post: posts._id });

    return {
      success: true,
      data: {
        post: {
          _id: posts._id.toString(),
          content: posts.content || "",
          likeCount: posts.likeCount || 0,
          commentCount,
          createdAt: posts.createdAt.toISOString(),
          updatedAt: posts.updatedAt.toISOString(),
          author: posts.author
            ? {
                _id: posts.author._id.toString(),
                name: posts.author.name,
                username: posts.author.username,
                image: posts.author.image,
              }
            : null,
        },
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
