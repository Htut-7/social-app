"use server";

import User, { IUserSearchResult } from "@/database/user.model";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import { actionError } from "../response";
import validateBody from "../validateBody";
import UserSearchSchema from "../schema/UserSearchSchema";

export async function UserSearch(params: {
  pageSize: number;
  page: number;
  search: string;
}): Promise<{
  success: boolean;
  data?: {
    user: IUserSearchResult[];
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

  const validatedData = validateBody(params, UserSearchSchema);
  const { page = 1, pageSize = 10, search } = validatedData.data;

  const limit = Number(pageSize);
  const skip = (Number(page) - 1) * limit;

  const filterQuery = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { username: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await User.find(filterQuery)
      .select("_id name username email image bio createdAt updatedAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit + 1)
      .lean();

    const isNext = users.length > limit;
    const paginatedUsers = users.slice(0, limit);

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(paginatedUsers)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
