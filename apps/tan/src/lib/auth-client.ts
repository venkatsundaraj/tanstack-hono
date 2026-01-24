import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.VITE_HONO_URL!,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signOut, useSession } = authClient;
