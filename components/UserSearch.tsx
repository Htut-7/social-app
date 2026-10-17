"use client";

import { IUser } from "@/database/user.model";
import React, { useEffect, useState } from "react";
import { UserSearch as searchUser } from "./lib/action/UserSearch.action";

function UserSearch() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function getUsers() {
      if (!search.trim()) {
        setUsers([]);
        return;
      }
      setLoading(true);

      const result = await searchUser({
        page: 1,
        pageSize: 10,
        search: search,
      });

      if (result.success && result.data) {
        setUsers(result.data.user);
      } else {
        setUsers([]);
      }
      setLoading(false);
    }
    getUsers();
  }, [search]);

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="search"
        placeholder="Search People..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
      />

      {search.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60">
          {loading ? (
            <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
              Searching...
            </p>
          ) : users.length === 0 ? (
            <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
              No users found.
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user.username}
                className="flex items-center gap-3 rounded-lg border-b border-slate-100 px-3 py-3 transition last:border-b-0 hover:bg-indigo-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    @{user.username}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default UserSearch;
