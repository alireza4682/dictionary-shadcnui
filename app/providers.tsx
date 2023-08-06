"use client";
import { Provider } from "react-redux";
import store from "./store/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProviders } from "./components/themeProviders";

import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProviders>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>{children}</Provider>
</PersistGate>
      </QueryClientProvider>
    </ThemeProviders>
  );
}
