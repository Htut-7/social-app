"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import validateBody from "../validateBody";
import UpdateProfileSchema from "../schema/UpdateProfileSchema";
import { actionError } from "../response";
import User from "@/database/user.model";

export async function UpdateProfile(params: {
  username: string;
  name: string;
  image: string;
  bio: string;
}): Promise<{
  success: boolean;
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const validatedData = validateBody(params, UpdateProfileSchema);
  const { username, name, image, bio } = validatedData.data;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== user._id.toString()) {
      throw new Error("Username already exists");
    }

    user.name = name;
    user.username = username;
    user.image = image;
    user.bio = bio;

    await user.save();

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
