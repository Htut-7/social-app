"use client";

import React, { useState } from "react";
import Link from "next/link";
import ROUTES from "@/ROUTES";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Unable to sign in. Check your email and password");
        return;
      }
      router.push(ROUTES.HOME);
      router.refresh();
    } catch {
      setError("Unable to Login. Please try again");
    } finally {
      setLoading(false);
    }
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
              Your everyday connections
            </span>

            <h2 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              Welcome back.
            </h2>
            <h3 className="mt-2 text-4xl leading-tight font-bold tracking-tight text-indigo-300 sm:text-5xl">
              Your people are here.
            </h3>

            <p className="mt-6 max-w-sm text-base leading-relaxed text-indigo-100/80">
              Catch up on new posts, share your latest moments, and pick up the
              conversations you love.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-7 text-indigo-100">
                Discover something new.
                <br />
                Reconnect through conversations.
                <br />
                Revisit your saved favorites.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center px-8 py-12 sm:px-12 lg:py-16">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Sign in to your account
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Good to see you again. Let&apos;s catch up.
            </p>

            <div className="mt-8 space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-indigo-600"
                />
                <label
                  htmlFor="remember"
                  className="cursor-pointer text-sm text-slate-600"
                >
                  Remember me
                </label>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white motion-reduce:animate-none"
                    />
                    <span role="status">Signing in...</span>
                  </>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="text-center">
                <Link
                  href={ROUTES.REGISTER}
                  className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 hover:underline"
                >
                  Don&apos;t have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Page;
