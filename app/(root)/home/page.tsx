import { auth } from "@/auth";
import { GetRegisterById } from "@/components/lib/action/GetRegister.action";
import Logout from "@/components/Logout";
import ROUTES from "@/ROUTES";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { GetPost } from "@/components/lib/action/GetPosts.action";

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

  const postResult = await GetPost({
    page: 1,
    pageSize: 10,
  });

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <h1 className="text-xl font-bold tracking-tight text-indigo-950 sm:text-2xl">
            Social App<span className="text-indigo-500">.</span>
          </h1>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href={ROUTES.CREATE}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                +
              </span>
              <span className="hidden sm:inline">Create post</span>
              <span className="sr-only sm:hidden">Create post</span>
            </Link>

            <div className="text-sm font-medium text-slate-600">
              <Logout />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="h-24 bg-indigo-950" />

            <div className="px-6 pb-6">
              <Link
                href={ROUTES.PROFILE(session.user.id)}
                aria-label="View your profile"
                className="-mt-10 inline-flex rounded-full bg-white p-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
              >
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

              <h2 className="mt-3 wrap-break-word text-xl font-bold text-slate-900">
                {user.name}
              </h2>

              <p className="mt-1 wrap-break-word text-sm font-medium text-indigo-600">
                @{user.username}
              </p>

              <span className="mt-2 block wrap-break-word text-xs text-slate-500">
                {user?.email}
              </span>

              <Link
                href={ROUTES.PROFILE(session.user.id)}
                className="mt-6 block rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View profile
              </Link>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl bg-indigo-950 px-6 py-8 text-white sm:px-8">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl"
            />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                Your everyday connection
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Welcome back, {user.name}.
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-indigo-200">
                Share what&apos;s on your mind and make room for a new
                conversation.
              </p>
            </div>
          </div>

          <Link
            href={ROUTES.CREATE}
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-sm"
          >
            <span className="text-sm text-slate-500">
              What&apos;s on your mind?
            </span>

            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-2xl text-indigo-600"
            >
              +
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-900">Your feed</h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {!postResult.success ? (
            <p role="alert" className="text-sm text-red-600">
              {postResult.message || "Unable to load posts"}
            </p>
          ) : postResult.data?.post.length ? (
            postResult.data.post.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
              <h3 className="text-lg font-semibold text-slate-700">
                No posts yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Share the first story with your people.
              </p>

              <Link
                href={ROUTES.CREATE}
                className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Create a post
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
