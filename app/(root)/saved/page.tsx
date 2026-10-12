import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GetSaved } from "@/components/lib/action/GetSaved.action";
import PostCard from "@/components/PostCard";
import Navbar from "@/components/Navbar";

export default async function SavedPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/Login");
  }

  const userId = session.user.id;

  const result = await GetSaved({
    page: 1,
    pageSize: 10,
  });

  if (!result.success) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <Navbar />
        <h1 className="text-2xl font-bold text-slate-900">Saved Posts</h1>
        <p className="mt-4 text-red-500">
          {result.message || "Unable to load saved posts."}
        </p>
      </main>
    );
  }

  const posts = result.data?.post ?? [];

  console.log(
    posts.map((post) => ({
      id: post._id,
      content: post.content,
    }))
  );

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Saved Posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            Posts you have saved for later.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-800">
              No saved posts yet
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Save a post using the bookmark button, and it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} currentUser={userId} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
