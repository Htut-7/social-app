import Navbar from "@/components/Navbar";
import CommentList from "@/components/CommentList";
import { GetPostById } from "@/components/lib/action/GetPostById.action";
import { notFound } from "next/navigation";
import Image from "next/image";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await GetPostById({
    postId: id,
  });

  if (!result.success || !result.data?.post) {
    notFound();
  }

  const post = result.data.post;

  const formattedDate = new Date(post.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Page heading */}
        <div className="mb-6">
          <p className="text-sm font-medium text-indigo-600">YOUR COMMUNITY</p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Post details
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View this post and join the conversation.
          </p>
        </div>
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
            {post.author?.image ? (
              <Image
                src={post.author.image}
                alt={`${post.author.name}'s profile`}
                width={52}
                height={52}
                className="h-13 w-13 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
              />
            ) : (
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700 ring-2 ring-slate-50">
                {post.author?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-slate-900">
                {post.author?.name ?? "Unknown user"}
              </p>

              {post.author?.username && (
                <p className="truncate text-sm text-slate-500">
                  @{post.author.username}
                </p>
              )}

              <p className="mt-1 text-xs text-slate-400">{formattedDate}</p>
            </div>

            {/* Post indicator */}
            <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              Post
            </span>
          </div>

          <div className="px-5 py-7 sm:px-7 sm:py-8">
            <p className="whitespace-pre-wrap wrap-break-word text-base leading-8 text-slate-700">
              {post.content || "No text content."}
            </p>
          </div>

          <div className="mx-5 flex items-center justify-between border-t border-slate-100 py-4 text-sm text-slate-500 sm:mx-7">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-50 text-rose-500"
              >
                ♥
              </span>
              {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
            </span>

            <a href="#comments" className="transition hover:text-indigo-600">
              {post.commentCount}{" "}
              {post.commentCount === 1 ? "comment" : "comments"}
            </a>
          </div>

          <div className="border-t border-slate-100 px-5 py-3 sm:px-7">
            <a
              href="#comments"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 4.5h5.25m-8.25 6 3.25-3H18a2.25 2.25 0 0 0 2.25-2.25v-7.5A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12.75Z"
                />
              </svg>
              Join the conversation
            </a>
          </div>
        </article>

        <section
          id="comments"
          className="mt-7 scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Conversation
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Share your thoughts with the community.
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {post.commentCount}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <CommentList postId={post._id} />
          </div>
        </section>

        {/* Post reference */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Post reference: {post._id}
        </p>
      </div>
    </main>
  );
}

export default Page;
