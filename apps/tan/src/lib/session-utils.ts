import { createServerOnlyFn } from "@tanstack/react-start";
import { getSession } from "./auth-client";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export const getCurrentUser = createServerOnlyFn(async () => {
  const { data } = await getSession({
    fetchOptions: {
      headers: getRequestHeaders() as HeadersInit,
    },
  });

  if (!data?.session || !data.user) {
    redirect({ to: "/" });
  }

  return { user: data?.user, session: data?.session };
});
