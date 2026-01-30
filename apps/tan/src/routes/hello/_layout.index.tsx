import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/hello/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <LayoutContent />
      <h2>venkat</h2>
    </>
  );
}

function LayoutContent() {
  return (
    <>
      <h1>hello world</h1>
      <Outlet />
    </>
  );
}
