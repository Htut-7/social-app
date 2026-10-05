import { auth } from "@/auth";
import { GetRegisterById } from "@/components/lib/action/GetRegister.action";
import Logout from "@/components/Logout";
import ROUTES from "@/ROUTES";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

async function Home() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(ROUTES.LOGIN);
  }

  const result = await GetRegisterById({
    userId: session?.user?.id,
  });

  if (!result.success || !result.data?.user) {
    throw new Error("User not found");
  }

  const user = result.data?.user;

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-3xl font-bold text-blue-600">Social App</h1>

      <Link href={ROUTES.PROFILE(session.user.id)}>
        {user.image ? (
          <Image
            src={user.image}
            width={96}
            height={96}
            alt={`${user.name}'s profile`}
            className="h-24 w-24 rounded-full bg-slate-100 object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
            {user.name.trim().charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </Link>
      <p>{user.username}</p>
      <span>{user?.email}</span>

      <Logout />
    </main>
  );
}

export default Home;
