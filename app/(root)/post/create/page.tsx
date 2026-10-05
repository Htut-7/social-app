"use client";

import { CreatePost } from "@/components/lib/action/CreatePost.action";
import ROUTES from "@/ROUTES";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Page() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const postHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await CreatePost({
        content,
      });

      if (!result.success) {
        throw new Error("Post creation failed");
      }

      router.push(ROUTES.HOME);
      router.refresh();
    } catch {
      setError("Unavailable to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12 sm:px-8">
      <form
        onSubmit={postHandler}
        className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl"
      >
        <div className="relative overflow-hidden bg-indigo-950 px-6 py-10 text-white sm:px-10">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl"
          />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
              Share a moment
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Create Post
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-indigo-200">
              A thought, a story, or something that made your day.
            </p>
          </div>
        </div>

        <div className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
          <div className="space-y-3">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-slate-700"
            >
              What&apos;s on your mind?
            </label>

            <textarea
              id="content"
              rows={8}
              placeholder="Start writing here..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
              className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base leading-relaxed text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="text-xs text-slate-500">
              Your post will be visible to other users.
            </p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end border-t border-slate-100 pt-6">
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto"
            >
              {loading ? "Loading..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
