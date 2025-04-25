import React from "react";
import { ClientTitle } from "@/components/client-wrappers/AntdTypography";
import { makeRickMortyClient } from "@/lib/rickmorty-apollo-client";
import { GetCharactersDocument } from "@/graphql/generated/rickmorty";
import type {
  GetCharactersQuery,
  FilterCharacter,
  GetCharactersQueryVariables,
} from "@/graphql/generated/rickmorty";

import CharacterClientPage from "./CharacterClientPage";

import { RickMortyApolloProvider } from "@/providers/RickMortyApolloProvider";

interface RickMortyPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function RickMortyPage({
  searchParams,
}: RickMortyPageProps) {
  console.log("Rendering RickMortyPage (Server Component)");

  const filter: FilterCharacter = {};
  if (searchParams?.status && typeof searchParams.status === "string")
    filter.status = searchParams.status;
  if (searchParams?.species && typeof searchParams.species === "string")
    filter.species = searchParams.species;
  if (searchParams?.type && typeof searchParams.type === "string")
    filter.type = searchParams.type;
  if (searchParams?.gender && typeof searchParams.gender === "string")
    filter.gender = searchParams.gender;

  Object.keys(filter).forEach(
    (key) =>
      !filter[key as keyof FilterCharacter] &&
      delete filter[key as keyof FilterCharacter]
  );

  let initialData: GetCharactersQuery | null = null;
  let ssrError: string | null = null;

  try {
    const serverClient = makeRickMortyClient();

    const { data, errors } = await serverClient.query<
      GetCharactersQuery,
      GetCharactersQueryVariables
    >({
      query: GetCharactersDocument,
      variables: { filter },
      errorPolicy: "all",
      // fetchPolicy: 'network-only' // Можно раскомментировать для гарантии свежести данных при SSR
    });

    if (errors && errors.length > 0) {
      console.error("SSR GraphQL Query Errors (R&M):", errors);
      ssrError =
        errors[0]?.message ?? "Unknown GraphQL error occurred on server";
    }
    initialData = data;
  } catch (error) {
    console.error("SSR Network/Apollo Error (R&M):", error);
    ssrError =
      error instanceof Error ? error.message : "Failed to fetch data on server";
  }

  return (
    <div
      style={{
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        height: "100vh",
      }}
    >
      <ClientTitle>Rick & Morty Characters (SSR)</ClientTitle>

      <RickMortyApolloProvider>
        <CharacterClientPage
          serverFilters={filter}
          initialData={initialData}
          initialError={ssrError}
        />
      </RickMortyApolloProvider>
    </div>
  );
}
