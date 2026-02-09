import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://api.venkateshsundarasan.workers.dev",
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, useSession, getSession } = authClient;
// import.meta.env.VITE_HONO_URL
