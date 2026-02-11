import { signIn } from "@/lib/auth-client";
import { serverEnv } from "@/lib/env";
import { clientEnv } from "@/lib/public-env";
import { getCurrentUser } from "@/lib/session-utils";
import {
  createFileRoute,
  redirect,
  useLoaderData,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const currentUser = createServerFn().handler(async function () {
  const data = await getCurrentUser();
  if (data.user?.id) throw redirect({ to: "/dashboard" });
  return;
});

export const getUser = createServerFn().handler(
  async (): Promise<{ name: string; id: string }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const userserver = await fetch(`${process.env.BETTER_AUTH_BASE_URL}/1`);
    const hello = await fetch(
      `${process.env.BETTER_AUTH_BASE_URL}/api/auth/health`,
    );
    console.log(await hello.json());
    const data: {
      name: string;
      id: string;
    }[] = await userserver.json();
    console.log(data, "raw");

    return [{ id: "1", name: "venkatsundaraj" }];
  },
);

export const Route = createFileRoute("/login/")({
  beforeLoad: async ({ context }) => {
    await currentUser();
  },
  component: RouteComponent,
  loader: async () => await getUser(),
});

function RouteComponent() {
  const rootData = useLoaderData({ from: "__root__" });
  // console.log(rootData.isValid);
  const user = Route.useLoaderData();

  const clickHandler = async function () {
    await signIn.social({
      provider: "google",
      callbackURL: `${import.meta.env.VITE_APP_URL}/dashboard`,
    });
  };
  return (
    <div>
      <button onClick={clickHandler}>login</button>
      {user.map((item, i) => (
        <h4 key={i}>{item.name}</h4>
      ))}

      {/* <Suspense fallback={<p>Loading...</p>}>
        <SuspenseComponent />
      </Suspense> */}
    </div>
  );
}
