"use client";

import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden bg-indigo-950 px-8 py-12 text-white sm:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
          />

          <div className="relative">
            <span className="mb-8 inline-block rounded-full border border-white/20 px-4 py-2 text-xs font-medium tracking-widest text-indigo-200 uppercase">
              Connect & share
            </span>

            <h2 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              Your moments.
              <br />
              <span className="text-indigo-300">Your people.</span>
            </h2>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-indigo-100/80">
              Share what&apos;s on your mind, discover new perspectives, and
              connect through everyday moments.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Share your stories.",
                "Join the conversation.",
                "Save what inspires you.",
              ].map((message) => (
                <div key={message} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-indigo-300"
                  />
                  <span className="text-sm text-indigo-100">{message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center px-8 py-12 sm:px-12 lg:py-16">
          <form className="w-full" onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              A place for your thoughts, photos, and conversations.
            </p>

            <div className="mt-8 space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="name"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
                />

                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-700"
                >
                  Username
                </label>
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={username}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create account
              </button>

              <p className="text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Page;
