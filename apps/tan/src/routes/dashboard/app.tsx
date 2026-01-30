import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/app"!</div>
}
