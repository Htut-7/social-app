"use server";

import User, { IUser } from "@/database/user.model";
import dbConnect from "../dbConnect";
import { auth } from "@/auth";
import { actionError } from "../response";
import validateBody from "../validateBody";
import UserSearchSchema from "../schema/UserSearchSchema";
import { QueryFilter } from "mongoose";

export async function UserSearch(params: {
  pageSize: number;
  page: number;
  search: string;
}): Promise<{
  success: boolean;
  data?: {
    user: IUser[];
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

  const skip = (Number(page) - 1) * 10;
  const limit = Number(pageSize);

  const filterQuery: QueryFilter<typeof User> = {};

  if (search) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { email: { $regex: new RegExp(search, "i") } },
      { username: { $regex: new RegExp(search, "i") } },
    ];
  }

  try {
    const totalUser = await User.countDocuments(filterQuery);
    const users = await User.find(filterQuery)
      .select("_id name username email image bio createdAt updatedAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit + 1)
      .lean();

    const isNext = totalUser > skip + users.length;

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(users)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
