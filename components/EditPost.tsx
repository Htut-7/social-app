"use client";

import React, { useState } from "react";
import { UpdatePost } from "./lib/action/UpdatePost.action";
import { useRouter } from "next/navigation";
import ROUTES from "@/ROUTES";

function EditPost({ postId, content }: { postId: string; content: string }) {
  const [postContent, setPostContent] = useState(content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await UpdatePost({
        postId,
        content: postContent,
      });

      if (!result.success) {
        throw new Error(result.message || "Filed to edit post");
      }

      router.push(ROUTES.HOME);
      router.refresh();
    } catch {
      setError("Failed to edit post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12 sm:px-8">
      <form
        onSubmit={updateHandler}
        className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl"
      >
        <h2 className="bg-indigo-950 px-6 py-8 text-3xl font-bold tracking-tight text-white sm:px-10">
          Edit Post
        </h2>

        <div className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
          <div className="space-y-3">
            <label
              htmlFor="postContent"
              className="block text-sm font-medium text-slate-700"
            >
              Edit Content
            </label>

            <textarea
              id="postContent"
              placeholder="Edit your post content"
              onChange={(e) => setPostContent(e.target.value)}
              value={postContent}
              required
              className="min-h-56 w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-base leading-relaxed text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </p>
          )}

          <div className="flex justify-end border-t border-slate-100 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {loading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
