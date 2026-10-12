"use server";

import dbConnect from "../dbConnect";
import { actionError } from "../response";
import { auth } from "@/auth";
import UnSaveSchema from "../schema/UnSaveSchema";
import validateBody from "../validateBody";

import Saved from "@/database/saved.model";

export async function UnSave(params: { postId: string }): Promise<{
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
    const validatedData = validateBody(params, UnSaveSchema);
    const { postId } = validatedData.data;

    const SavePost = await Saved.findOne({
      user: session.user.id,
      post: postId,
    });

    if (!SavePost) {
      throw new Error("Saved Post not found");
    }

    await Saved.deleteOne({
      _id: SavePost._id,
      user: session.user.id,
    });

    return {
      success: true,
      message: "Post removed from saved posts",
    };
  } catch (e) {
    return actionError(e);
  }
}
