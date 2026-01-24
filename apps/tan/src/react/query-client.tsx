import {
  QueryClientProvider,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

export const Provider = function ({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
