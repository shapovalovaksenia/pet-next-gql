"use client";

import { ApolloProvider as DefaultApolloProvider } from "@apollo/client";
import { makeRickMortyClient } from "@/lib/rickmorty-apollo-client";

export function RickMortyApolloProvider({ children }: React.PropsWithChildren) {
  const rickMortyClient = makeRickMortyClient();
  return (
    <DefaultApolloProvider client={rickMortyClient}>
      {children}
    </DefaultApolloProvider>
  );
}
