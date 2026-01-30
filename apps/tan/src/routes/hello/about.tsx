import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hello/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/hello/about/"!</div>;
}
