import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import { createServerFn } from "@tanstack/react-start";
import { clientEnv, serverEnv } from "@/lib/env";

const hello = createServerFn().handler(() => {});

export const Route = createFileRoute("/")({
  component: App,
  loader: () => hello(),
});

function App() {
  const user = Route.useLoaderData();

  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}
