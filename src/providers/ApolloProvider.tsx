"use client";

import { ApolloProvider as DefaultApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <DefaultApolloProvider client={client}>{children}</DefaultApolloProvider>
  );
}
