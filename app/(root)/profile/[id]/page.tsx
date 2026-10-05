import { auth } from "@/auth";
import { GetRegisterById } from "@/components/lib/action/GetRegister.action";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/ROUTES";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const result = await GetRegisterById({
    userId: id,
  });

  if (!result.success || !result.data?.user) {
    return (
      <p className="flex min-h-screen items-center justify-center bg-slate-100 text-lg font-medium text-slate-500">
        No User found.
      </p>
    );
  }

  const user = result.data.user;
  const isOwnProfile = session?.user?.id === id;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-12 sm:px-8">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="relative h-40 overflow-hidden bg-indigo-950 sm:h-48">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl"
          />

          <span className="absolute left-6 top-6 rounded-full border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-widest text-indigo-200 sm:left-10">
            Your people. Your stories.
          </span>
        </div>

        <div className="relative px-6 pb-8 sm:px-10 sm:pb-10">
          <div className="-mt-12 inline-flex rounded-full bg-white p-1.5">
            {user.image ? (
              <Image
                src={user.image}
                width={96}
                height={96}
                alt={""}
                className="h-24 w-24 rounded-full bg-slate-100 object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
                {user.name.trim().charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          <div className="mt-5">
            <h2 className="wrap-break-word text-3xl font-bold tracking-tight text-slate-900">
              {user.name}
            </h2>

            <span className="mt-2 block wrap-break-word text-sm font-medium text-indigo-600">
              {user.username}
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              About
            </h3>

            <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-slate-600">
              {user.bio || "No Bio yet"}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {isOwnProfile && (
              <div>
                <Link
                  href={ROUTES.EDIT_PROFILE}
                  className="block rounded-xl bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Profile
                </Link>
              </div>
            )}

            <div>
              <Link
                href={"/"}
                className="block rounded-xl border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
