import NextAuth from "next-auth";
import Credential from "next-auth/providers/credentials";
import LoginSchema from "./components/lib/schema/LoginSchema";
import dbConnect from "./components/lib/dbConnect";
import User from "./database/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credential({
      async authorize(credential) {
        const validatedField = LoginSchema.safeParse(credential);
        if (validatedField.success) {
          const { email, password } = validatedField.data;

          await dbConnect();

          const existingUser = await User.findOne({
            email,
          }).select("passwordHash");

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
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
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
