import React from "react";

import Link from "next/link";
import { auth } from "@/auth";
import { GetRegisterById } from "@/components/lib/action/GetRegister.action";
import Image from "next/image";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await auth();
  const result = await GetRegisterById({
    userId: id,
  });

  if (!result.success || !result?.data?.user) {
    return <p className="p-8">User not found</p>;
  }

  const user = result.data.user;
  const isOwnProfile = session?.user?.id === id;

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-lg">
        <div className="h-32 bg-indigo-950" />

        <div className="p-8">
          {user.image ? (
            <Image
              width={96}
              height={96}
              src={user.image}
              alt={`${user.name}'s profile`}
              referrerPolicy="no-referrer"
              className="mb-6 h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          ) : (
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
              {user.name.trim().charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>

          <p className="mt-2 text-sm text-indigo-600">@{user.username}</p>

          <p className="mt-6 leading-relaxed text-slate-600">
            {user.bio || "No bio yet."}
          </p>

          <p className="mt-4 text-sm text-slate-400">
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </p>

          <div className="mt-8 flex items-center gap-4">
            {isOwnProfile && (
              <Link
                href="/profile/edit"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Edit profile
              </Link>
            )}

            <Link
              href="/home"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
