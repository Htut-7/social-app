import Navbar from "@/components/Navbar";
import CommentList from "@/components/CommentList";
import { GetPostById } from "@/components/lib/action/GetPostById.action";
import { notFound } from "next/navigation";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await GetPostById({
    postId: id,
  });

  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data.post;

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="mx-auto max-w-2xl px-4 py-8">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-5 sm:p-6">
            <div className="mb-5">
              <h1 className="text-lg font-semibold text-slate-900">Post</h1>

              <p className="mt-1 text-xs text-slate-400">Post ID: {post._id}</p>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <p className="whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-slate-700">
                {post.content}
              </p>
            </div>

            <div className="mt-6 flex items-center gap-6 border-t border-slate-100 pt-4">
              <button
                type="button"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                Like
              </button>

              <button
                type="button"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                Comment
              </button>
            </div>
          </div>
        </article>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Comments
          </h2>

          <CommentList postId={post._id} />
        </section>
      </div>
    </main>
  );
}

export default Page;
