"use client";

import ROUTES from "@/ROUTES";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

function AuthForm() {
  const [error, setError] = useState("");

  const oAuthSignIn = async (type: "google" | "facebook") => {
    try {
      await signIn(type, {
        redirectTo: ROUTES.HOME,
      });
    } catch {
      setError("Unable to start sign-in. Please try again");
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => oAuthSignIn("google")}
          className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.36Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.97-3.38.97-2.6 0-4.81-1.76-5.6-4.12H3.05v2.59A10 10 0 0 0 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.4 13.93a6 6 0 0 1 0-3.86V7.48H3.05a10 10 0 0 0 0 9.04l3.35-2.59Z"
            />
            <path
              fill="#EA4335"
              d="M12 5.95c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.95 5.48l3.35 2.59C7.19 7.71 9.4 5.95 12 5.95Z"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => oAuthSignIn("facebook")}
          className="flex items-center justify-center gap-3 rounded-xl border border-blue-600 bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:border-blue-700 hover:bg-blue-700 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.026 4.388 11.021 10.125 11.927v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.971h-1.513c-1.49 0-1.956.931-1.956 1.887v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.099 24 12.073Z" />
          </svg>
          Facebook
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default AuthForm;
