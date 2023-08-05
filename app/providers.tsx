"use client";
import { Provider } from "react-redux";
import store from "./store/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProviders } from "./components/themeProviders";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviders>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </ThemeProviders>
  );
}
