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

function PostCard({ post }: { post: FeedPost }) {
  const author = post.author;

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
    </article>
  );
}

export default PostCard;
