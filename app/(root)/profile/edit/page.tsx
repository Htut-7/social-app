import { auth } from "@/auth";
import EditProfile from "@/components/EditProfile";
import { GetRegisterById } from "@/components/lib/action/GetRegister.action";
import ROUTES from "@/ROUTES";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(ROUTES.LOGIN);
  }

  const result = await GetRegisterById({
    userId: session?.user?.id,
  });

  if (!result.success || !result.data?.user) {
    return (
      <p className="flex min-h-screen items-center justify-center bg-slate-100 text-lg font-medium text-slate-500">
        No User found.
      </p>
    );
  }

  const user = result.data.user;

  return (
    <div>
      <EditProfile
        userId={session?.user?.id}
        user={{
          name: user.name,
          username: user.username,
          bio: user.bio || "",
          image: user.image || "",
        }}
      />
    </div>
  );
}

export default page;
