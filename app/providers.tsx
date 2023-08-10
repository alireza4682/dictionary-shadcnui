"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProviders } from "./components/themeProviders";
import store, { persistor } from "./store/store";

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
