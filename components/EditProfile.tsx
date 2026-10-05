"use client";

import ROUTES from "@/ROUTES";
import React, { useState } from "react";
import Link from "next/link";
import { UpdateProfile } from "./lib/action/UpdateProfile.action";
import { useRouter } from "next/navigation";

interface userProfile {
  name: string;
  username: string;
  image: string;
  bio: string;
}

function EditProfile({ user, userId }: { user: userProfile; userId: string }) {
  const [image, setImage] = useState(user.image);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const result = await UpdateProfile({
        username,
        name,
        image,
        bio,
      });

      if (!result.success) {
        throw new Error("Profile Update failed");
      }

      router.push(ROUTES.PROFILE(userId));
      router.refresh();

      setSuccess(result.message || "Profile update successfully");
    } catch {
      setError("Unable to update your profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12 sm:px-8">
      <form
        className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-xl"
        onSubmit={handleEdit}
      >
        <div className="relative overflow-hidden bg-indigo-950 px-6 py-10 text-white sm:px-10">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl"
          />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
              Make it yours
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Edit Profile Form
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-indigo-200">
              Update your details and share a little about yourself.
            </p>
          </div>
        </div>

        <div className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-slate-700"
            >
              Image
            </label>
            <input
              id="image"
              type="url"
              placeholder="Enter your profile image"
              accept="image/jpeg,image/png,webp"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
            <p className="text-xs text-slate-500">
              Paste a link to your profile photo.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-slate-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              placeholder="Enter Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {success && (
            <p role="status" className="text-sm text-green-600">
              {success}
            </p>
          )}

          <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Loading..." : "Update Profile"}
            </button>

            <Link
              href={ROUTES.PROFILE(userId)}
              className="rounded-xl border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
