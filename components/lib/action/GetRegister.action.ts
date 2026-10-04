"use server";

import User, { IUser } from "@/database/user.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import GetRegisterSchema from "../schema/GetRegisterSchema";
import validateBody from "../validateBody";

export async function GetRegister(): Promise<{
  success: boolean;
  data?: IUser[];
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  try {
    const users = await User.find();

    if (!users) {
      throw new Error("Users not found");
    }

    return {
      success: true,
      data: users,
      message: "All user found",
    };
  } catch (e) {
    return actionError(e);
  }
}

export async function GetRegisterById(params: { userId: string }): Promise<{
  success: boolean;
  data?: {
    user: IUser;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  try {
    const validatedData = validateBody(params, GetRegisterSchema);
    const { userId } = validatedData.data;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      data: {
        user,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
