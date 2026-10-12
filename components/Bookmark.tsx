"use client";

import { useState } from "react";
import { UnSave } from "./lib/action/UnSave.action";
import { SavePost } from "./lib/action/SavePost.action";

function Bookmark({ postId, isSaved }: { postId: string; isSaved: boolean }) {
  const [saved, setSaved] = useState(isSaved);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const saveHandler = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      let result;

      if (saved) {
        result = await UnSave({ postId });
      } else {
        result = await SavePost({ postId });
      }

      if (!result.success) {
        throw new Error(result.message || "Unable to update bookmark");
      }

      setSaved(!saved);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={saveHandler}
        disabled={loading}
        aria-label={saved ? "Remove saved post" : "Save post"}
        aria-pressed={saved}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4z" />
        </svg>

        <span>{loading ? "Saving..." : saved ? "Saved" : "Save"}</span>
      </button>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Bookmark;
