"use client";

import ROUTES from "@/ROUTES";
import { signOut } from "next-auth/react";
import React from "react";

function Logout() {
  return (
    <div>
      <button onClick={() => signOut({ callbackUrl: ROUTES.LOGIN })}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
