import { signOut } from "@/lib/auth-client";
import { authenticatedMiddleware } from "@/lib/auth-utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const hello = createServerFn()
  .middleware([authenticatedMiddleware])
  .handler(({ context }) => {
    console.log(context);
    return { ...context.user };
  });
export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  loader: async () => hello(),
});

function RouteComponent() {
  const user = Route.useLoaderData();

  return (
    <div>
      Hello "/dashboard/"!
      {user.email}
      <button
        onClick={async () => {
          await signOut();
        }}
      >
        signout
      </button>
      <Link to="/dashboard/app">App</Link>
    </div>
  );
}
