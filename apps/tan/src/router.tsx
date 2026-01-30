import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
// Import the generated route tree
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
  const queryClient = new QueryClient();
  const router = routerWithQueryClient(
    createRouter({
      routeTree,
      context: { queryClient },
      defaultPreload: "intent",
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
    }),
    queryClient,
  );

  return router;
};
