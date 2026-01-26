import { signIn } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const getUser = createServerFn().handler(async () => {
  const user = await fetch(`${process.env.VITE_HONO_URL}1`);
  return await user.json();
});

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
  loader: async () => await getUser(),
});

function RouteComponent() {
  const user = Route.useLoaderData();
  console.log(user);
  const clickHandler = async function () {
    await signIn.social({
      provider: "google",
      callbackURL: `${process.env.VITE_APP_URL}/dashboard`,
    });
  };
  return (
    <div>
      <button onClick={clickHandler}>login</button>
    </div>
  );
}
