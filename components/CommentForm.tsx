"use client";

import React, { useState } from "react";
import { CreateComment } from "./lib/action/CreateComment.action";

function CommentForm({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const commentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading || !comment.trim()) return;

    setLoading(true);
    setError("");

    try {
      const result = await CreateComment({
        postId,
        content: comment.trim(),
      });

      if (!result.success) {
        throw new Error(result.message || "Unable to comment on this post");
      }

      setComment("");
    } catch {
      setError("Unable to comment on this post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <form onSubmit={commentHandler}>
        <div className="flex items-end gap-3">
          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={1}
            disabled={loading}
            className="min-h-10 flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={loading || !comment.trim()}
            className="rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "..." : "Post"}
          </button>
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default CommentForm;
