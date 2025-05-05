"use client";
import { ApolloProvider as DefaultApolloProvider } from "@apollo/client";
import { makeAniListClient } from "@/lib/anilist-apollo-client";

export default function AniListApolloProvider({
  children,
}: React.PropsWithChildren) {
  const aniListClient = makeAniListClient();

  return (
    <DefaultApolloProvider client={aniListClient}>
      {children}
    </DefaultApolloProvider>
  );
}
