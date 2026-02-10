import { createAuthClient } from "better-auth/react";
import { clientEnv } from "./env";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_HONO_URL,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, useSession, getSession } = authClient;
// import.meta.env.VITE_HONO_URL
