import React from "react";
import { ClientTitle } from "@/components/client-wrappers/AntdTypography";
import { makeRickMortyClient } from "@/lib/rickmorty-apollo-client";
import { GetCharactersDocument } from "@/graphql/generated/rickmorty";
import type {
  GetCharactersQuery,
  GetCharactersQueryVariables,
} from "@/graphql/generated/rickmorty";

import CharacterClientPage from "./CharacterClientPage";

import { RickMortyApolloProvider } from "@/providers/RickMortyApolloProvider";
import { parseFiltersFromSearchParams } from "@/helpers/url";
interface RickMortyPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function RickMortyPage({
  searchParams,
}: RickMortyPageProps) {
  const filter = parseFiltersFromSearchParams(searchParams);

  let initialData: GetCharactersQuery | null = null;

  try {
    const serverClient = makeRickMortyClient();

    const { data, errors } = await serverClient.query<
      GetCharactersQuery,
      GetCharactersQueryVariables
    >({
      query: GetCharactersDocument,
      variables: { filter },
      errorPolicy: "all",
    });

    if (errors && errors.length > 0) {
      console.error("SSR GraphQL Query Errors (R&M):", errors);
    }
    initialData = data;
  } catch (error) {
    console.error("SSR Network/Apollo Error (R&M):", error);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <ClientTitle>Rick & Morty Characters (SSR)</ClientTitle>

      <RickMortyApolloProvider>
        <CharacterClientPage initialData={initialData} />
      </RickMortyApolloProvider>
    </div>
  );
}
