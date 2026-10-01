"use server";

import dbConnect from "../dbConnect";
import mongoose from "mongoose";
import { actionError } from "../response";
import validateBody from "../validateBody";
import RegisterSchema from "../schema/RegisterSchema";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";

export async function Register(params: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = validateBody(params, RegisterSchema);
    const { name, username, email, password } = validatedData.data;

    const passwordHash = bcrypt.hash(password, 10);

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new Error("Username already exists");
    }
    await User.create([
      {
        name,
        username,
        email,
        passwordHash,
      },
    ]);

    return {
      success: true,
      message: "Account created Successfully",
    };
  } catch (e) {
    return actionError(e);
  }
}
