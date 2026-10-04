import { auth } from "@/auth";
import Logout from "@/components/Logout";
import ROUTES from "@/ROUTES";
import Link from "next/link";

async function Home() {
  const session = await auth();
  console.log(session?.user?.email);

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-3xl font-bold text-blue-600">Social App</h1>

      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>

      {session?.user?.id && (
        <Link href={ROUTES.PROFILE(session?.user?.id)}>Profile</Link>
      )}

      <Logout />
    </main>
  );
}

export default Home;
