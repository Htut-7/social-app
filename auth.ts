import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import LoginSchema from "./components/lib/schema/LoginSchema";
import dbConnect from "./components/lib/dbConnect";
import User from "./database/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Account from "./database/account.model";
import { Types } from "mongoose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Facebook,
    Credential({
      async authorize(credential) {
        const validatedField = LoginSchema.safeParse(credential);
        if (validatedField.success) {
          const { email, password } = validatedField.data;

          await dbConnect();

          const existingUser = await User.findOne({
            email,
          }).select("+passwordHash");

          if (!existingUser?.passwordHash) return null;

          const isValidPassword = await bcrypt.compare(
            password,
            existingUser.passwordHash
          );

          if (isValidPassword) {
            return {
              id: existingUser._id.toString(),
              name: existingUser.name,
              email: existingUser.email,
              image: existingUser.image,
            };
          }
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !["google", "facebook"].includes(account.provider)) {
        return false;
      }

      try {
        await dbConnect();
        const existingAccount = await Account.findOne({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        if (existingAccount) {
          const existingUser = await User.findById(existingAccount.user);
          return Boolean(existingUser);
        }

        const email = user.email?.trim().toLowerCase();

        if (!email) return false;

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
          return false;
        }

        const userId = new Types.ObjectId();

        const newUser = await User.create({
          _id: userId,
          name: user.name || "New User",
          username: `user${userId.toString()}`,
          email,
          image: user.image,
        });

        await Account.create({
          user: newUser._id,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      if (account?.type === "credentials" && user) {
        token.sub = user.id;
      } else if (account) {
        await dbConnect();

        const existingAccount = await Account.findOne({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        if (!existingAccount) {
          throw new Error("OAuth account not found");
        }
        token.sub = existingAccount.user.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
});
