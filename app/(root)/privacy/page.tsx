import React from "react";
import Navbar from "@/components/Navbar";

const sections = [
  {
    number: "01",
    title: "Introduction",
    content:
      "Welcome to Social App. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website and services.",
  },
  {
    number: "02",
    title: "Information We Collect",
    content:
      "We may collect your name, username, email address, profile image, and authentication information when you register or sign in using credentials, Google, or Facebook. We may also store content you create, including posts, comments, likes, and saved posts.",
  },
  {
    number: "03",
    title: "How We Use Your Information",
    content:
      "We use your information to create and manage accounts, authenticate users, maintain secure sessions, display profiles and posts, provide social features, and maintain and improve our website.",
  },
  {
    number: "04",
    title: "Third-Party Authentication",
    content:
      "If you sign in through Google or Facebook, those services may provide information according to the permissions you grant. Your use of those services is also subject to their respective privacy policies.",
  },
  {
    number: "05",
    title: "Data Sharing and Security",
    content:
      "We do not sell your personal information. We may use third-party providers for hosting, databases, and authentication. We take reasonable measures to protect your information, although no online service can guarantee absolute security.",
  },
  {
    number: "06",
    title: "Data Retention and Deletion",
    content:
      "We retain information as needed to provide our services and meet applicable obligations. You may contact us to request access to, correction of, or deletion of your personal information, subject to applicable requirements.",
  },
  {
    number: "07",
    title: "Children's Privacy",
    content:
      "Our service is not intended for children who are not permitted to use it under applicable laws. We do not knowingly collect personal information from children where doing so is prohibited.",
  },
  {
    number: "08",
    title: "Changes to This Policy",
    content:
      "We may update this Privacy Policy as our service evolves. Updates will be published on this page with a revised date.",
  },
];

function Page() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-800">
        <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white sm:py-28">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              Your privacy matters
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              We believe you should understand what information you share with
              us and how we use it. Here is how Social App handles your data.
            </p>

            <p className="mt-8 text-sm text-slate-400">
              Last updated: October 17, 2026
            </p>
          </div>
        </section>

        <section className="px-6 py-14 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[240px_1fr]">
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                On this page
              </h2>

              <nav aria-label="Privacy policy sections">
                <ul className="space-y-3">
                  {sections.map((section) => (
                    <li key={section.number}>
                      <a
                        href={`#section-${section.number}`}
                        className="text-sm text-slate-600 transition hover:text-indigo-600"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#contact"
                      className="text-sm text-slate-600 transition hover:text-indigo-600"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            <div className="space-y-5">
              {sections.map((section) => (
                <article
                  key={section.number}
                  id={`section-${section.number}`}
                  className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                      {section.number}
                    </span>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                      {section.title}
                    </h2>
                  </div>

                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    {section.content}
                  </p>

                  {section.number === "04" && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                      >
                        Google Privacy Policy ↗
                      </a>
                      <a
                        href="https://www.facebook.com/privacy/policy/"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
                      >
                        Meta Privacy Policy ↗
                      </a>
                    </div>
                  )}
                </article>
              ))}

              <article
                id="contact"
                className="scroll-mt-8 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6 sm:p-8"
              >
                <h2 className="text-xl font-semibold text-slate-900">
                  Contact Us
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  Have a question about your personal information or want to
                  request data deletion? Contact us at the email address below.
                </p>
                <p className="mt-4 font-medium text-indigo-700">
                  Replace with your contact email
                </p>
              </article>

              <p className="px-2 py-4 text-xs leading-6 text-slate-500">
                This policy should accurately reflect your application&apos;s
                actual data collection, retention, sharing, and deletion
                practices before publication.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 bg-white px-6 py-8">
          <div className="mx-auto flex max-w-5xl flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
            <p>© 2026 Social App. All rights reserved.</p>
            <p>Privacy and transparency matter.</p>
          </div>
        </footer>
      </main>
    </>
  );
}

export default Page;
