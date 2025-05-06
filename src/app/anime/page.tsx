import React from "react";
import { ClientTitle } from "@/components/client-wrappers/AntdTypography";
import { makeAniListClient } from "@/lib/anilist-apollo-client";
import { GetMediaListDocument, MediaSort } from "@/graphql/generated/anilist";
import type {
  GetMediaListQuery,
  GetMediaListQueryVariables,
} from "@/graphql/generated/anilist";
import AnimeClientPage from "./AnimeClientPage";
import AniListApolloProvider from "@/providers/AniListApolloProvider";
import { DEFAULT_ANIME_PAGE_SIZE } from "@/shared/constant";

export default async function AnimePage() {
  const initialPage = 1;
  const initialSort: MediaSort[] = [MediaSort.ScoreDesc];

  let initialData: GetMediaListQuery | null = null;
  let ssrError: string | null = null;
  let totalCount: number | undefined = undefined;

  try {
    const serverClient = makeAniListClient();

    const { data, errors } = await serverClient.query<
      GetMediaListQuery,
      GetMediaListQueryVariables
    >({
      query: GetMediaListDocument,
      variables: {
        page: initialPage,
        perPage: DEFAULT_ANIME_PAGE_SIZE,
        sort: initialSort,
      },
      errorPolicy: "all",
    });

    if (errors && errors.length > 0) {
      console.error(
        "SSR GraphQL Query Errors:",
        errors.map((e) => e.message).join(", ")
      );
      ssrError = errors[0]?.message ?? "Unknown GraphQL error";
    }

    initialData = data;
    totalCount = data?.Page?.pageInfo?.total ?? undefined;
  } catch (error) {
    console.error(
      "SSR Network/Apollo Error:",
      error instanceof Error ? error.message : error
    );

    ssrError = error instanceof Error ? error.message : "Failed to fetch data";
  }

  return (
    <div>
      <ClientTitle level={2}>Anime List (SSR)</ClientTitle>

      <AniListApolloProvider>
        <AnimeClientPage
          initialData={initialData}
          initialError={ssrError}
          initialTotalCount={totalCount}
        />
      </AniListApolloProvider>
    </div>
  );
}
