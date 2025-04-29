import { RICKMORTY_GRAPHQL_ENDPOINT } from "@/shared/constant";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export const makeRickMortyClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({
    uri: RICKMORTY_GRAPHQL_ENDPOINT,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  });
};
