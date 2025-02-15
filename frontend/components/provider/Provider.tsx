"use client";
import { ToastProvider } from "@/components/ui/notify-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: "always",
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        queryKey: mutation.options.mutationKey,
      });
    },
  }),
});

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <ToastProvider
            preventDuplicates
            duration={3000}
            position={"top-right"}
          >
            <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
          </ToastProvider>
        </NuqsAdapter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
