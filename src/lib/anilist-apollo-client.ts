import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { ANILIST_GRAPHQL_ENDPOINT } from "@/shared/constant";

export const makeAniListClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: ANILIST_GRAPHQL_ENDPOINT,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  });
};
