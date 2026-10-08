"use client";

import { useState } from "react";
import { ToogleLike } from "./lib/action/ToogleLike.action";

function LikeButton({
  postId,
  initialLikeCount,
  initialIsLiked,
}: {
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
}) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [loading, setLoading] = useState(false);

  const likeHandler = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const result = await ToogleLike({
        postId,
      });

      if (!result.success || !result.data) {
        throw new Error(result.message || "Unable to like this post");
      }

      setLikeCount(result.data.likeCount);
      setIsLiked(result.data.isLiked);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={likeHandler}
      disabled={loading}
      aria-label={isLiked ? "Unlike post" : "Like post"}
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={isLiked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 10v10" />
        <path d="M4 10h3v10H4z" />
        <path d="M7 10l3-7c.2-.5.7-.8 1.2-.8.8 0 1.5.7 1.5 1.5V7h4.6c1.1 0 1.9 1 1.7 2.1l-1.1 6.5c-.2 1-1 1.7-2 1.7H7" />
      </svg>

      <span>{likeCount}</span>
    </button>
  );
}

export default LikeButton;
