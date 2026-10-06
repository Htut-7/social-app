import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/ROUTES";

export interface FeedPost {
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
}

function PostCard({
  post,
  currentUser,
}: {
  post: FeedPost;
  currentUser: string;
}) {
  const author = post.author;
  const isOwnPost = author?._id === currentUser;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        {author ? (
          <Link
            href={ROUTES.PROFILE(author._id)}
            aria-label={`View ${author.name}'s profile`}
            className="shrink-0"
          >
            {author.image ? (
              <Image
                src={author.image}
                width={48}
                height={48}
                alt={`${author.name}'s profile`}
                className="h-12 w-12 rounded-full bg-slate-100 object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
                {author.name.trim().charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </Link>
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500">
            U
          </div>
        )}

        <div className="min-w-0">
          {author ? (
            <Link
              href={ROUTES.PROFILE(author._id)}
              className="block truncate text-sm font-semibold text-slate-900 hover:text-indigo-600"
            >
              {author.name}
            </Link>
          ) : (
            <p className="text-sm font-semibold text-slate-500">Deleted user</p>
          )}

          {author && (
            <p className="truncate text-xs text-slate-500">
              @{author.username}
            </p>
          )}

          <time
            dateTime={post.createdAt}
            className="mt-1 block text-xs text-slate-400"
          >
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>
        </div>
      </div>

      <p className="mt-5 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-slate-700">
        {post.content}
      </p>

      {isOwnPost && (
        <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4">
          <Link
            href={ROUTES.EDIT_POST(post._id)}
            aria-label="Edit post"
            title="Edit post"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m16 4 4 4" />
              <path d="M4 20l4-1 12-12a2.83 2.83 0 0 0-4-4L4 15z" />
            </svg>
          </Link>

          <button
            type="button"
            aria-label="Delete post"
            title="Delete post"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M9 6V4h6v2" />
              <path d="m5 6 1 14h12l1-14" />
              <path d="M10 10v6M14 10v6" />
            </svg>
          </button>
        </div>
      )}
    </article>
  );
}

export default PostCard;
