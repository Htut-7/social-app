import Link from "next/link";
import ROUTES from "@/ROUTES";
import Logout from "./Logout";

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold tracking-tight text-indigo-950 sm:text-2xl"
        >
          Social App<span className="text-indigo-500">.</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href={ROUTES.CREATE}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              +
            </span>

            <span className="hidden sm:inline">Create post</span>
            <span className="sr-only sm:hidden">Create post</span>
          </Link>

          <div className="text-sm font-medium text-slate-600">
            <Logout />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
