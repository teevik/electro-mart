import React, { useCallback, useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./state/auth.tsx";
import { CartProvider } from "./state/cart.tsx";
import {
  OperationSchema,
  QraftContext,
  requestFn,
  RequestFnPayload,
} from "@openapi-qraft/react";

const queryClient = new QueryClient();

interface ApiProviderProps {
  children: React.ReactNode;
}

function ApiProvider(props: ApiProviderProps) {
  const { children } = props;

  const { token } = useAuth();

  const authRequestFn = useCallback(
    <T,>(input: OperationSchema, init: RequestFnPayload) => {
      const initWithAuth = {
        ...init,
        parameters: {
          ...init.parameters,
          header: {
            ...init.parameters?.header,
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        },
      };

      return requestFn<T>(input, initWithAuth);
    },
    [token]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <QraftContext.Provider
        value={{
          baseUrl: "https://electro-mart.fly.dev/api", // base URL for all requests
          requestFn: authRequestFn,
        }}
      >
        {children}
      </QraftContext.Provider>
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
