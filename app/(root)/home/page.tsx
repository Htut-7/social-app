import { auth } from "@/auth";
import Logout from "@/components/Logout";

async function Home() {
  const session = await auth();
  console.log(session?.user?.email);

  return (
    <main className="space-y-4 p-8">
      <h1 className="text-3xl font-bold text-blue-600">Social App</h1>

      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>

      <Logout />
    </main>
  );
}

export default Home;
