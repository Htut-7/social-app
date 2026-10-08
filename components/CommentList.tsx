import Image from "next/image";
import { GetComment } from "./lib/action/GetComment.action";
import CommentLikeButton from "./CommentLikeButton";

type CommentWithAuthor = {
  isLiked: boolean;
  _id: string;
  content: string;
  likeCount: number;
  createdAt: string;
  author: {
    _id: string;
    name: string;
    username: string;
    image?: string;
  } | null;
};

async function CommentList({ postId }: { postId: string }) {
  const result = await GetComment({
    postId,
  });

  if (!result.success || !result.data) {
    throw new Error(result.message);
  }

  const comments = result.data.comment as unknown as CommentWithAuthor[];

  if (comments.length === 0) {
    return <p className="text-sm text-slate-500">No comments yet.</p>;
  }

  return (
    <div className="space-y-5">
      {comments.map((comment) => {
        const author = comment.author;

        return (
          <div key={comment._id} className="flex gap-3">
            {author?.image ? (
              <Image
                src={author.image}
                width={40}
                height={40}
                alt={`${author.name}'s profile`}
                className="h-10 w-10 shrink-0 rounded-full bg-slate-100 object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                {author?.name?.trim().charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">
                  {author?.name || "Deleted user"}
                </p>

                {author?.username && (
                  <p className="text-xs text-slate-400">@{author.username}</p>
                )}

                <p className="mt-2 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-slate-700">
                  {comment.content}
                </p>
              </div>

              <div className="mt-1 flex items-center gap-4 px-2">
                <p className="text-xs text-slate-400">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </p>

                <CommentLikeButton
                  commentId={comment._id}
                  initialIsLiked={comment.isLiked}
                  initialLikeCount={comment.likeCount}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentList;
