// "use server";

// import { IUser } from "@/database/user.model";
// import dbConnect from "../dbConnect";
// import { auth } from "@/auth";
// import { actionError } from "../response";
// import validateBody from "../validateBody";
// import UserSearchSchema from "../schema/UserSearchSchema";

// export async function UserSearch(params: {
//   pageSize: number;
//   page: number;
//   search: string;
// }): Promise<{
//   success: boolean;
//   data?: {
//     user: IUser[];
//     isNext: boolean;
//   };
//   message?: string;
//   details?: object | null;
// }> {
//   await dbConnect();

//   const session = await auth();

//   if (!session?.user?.id) {
//     throw new Error("Unauthorized");
//   }

//   try {
//     const validatedData = validateBody(params, UserSearchSchema);
//     const { page = 1, pageSize = 10, search } = validatedData.data;
//   } catch (e) {
//     return actionError(e);
//   }
// }
