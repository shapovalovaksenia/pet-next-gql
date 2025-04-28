"use client";

import React, { useCallback, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, Spin, Space } from "antd";

import { GetCharactersDocument } from "@/graphql/generated/rickmorty";
import type {
  GetCharactersQuery,
  FilterCharacter,
  GetCharactersQueryVariables,
  Character,
} from "@/graphql/generated/rickmorty";

import CharacterFilterBar from "@/components/features/rick-and-morty/CharacterFilterBar";
import CharacterList from "@/components/features/rick-and-morty/CharacterList";
import { parseFiltersFromSearchParams } from "@/helpers/url";

interface CharacterClientPageProps {
  initialData: GetCharactersQuery | null;
}

export default function CharacterClientPage({
  initialData,
}: CharacterClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilters = useMemo(() => {
    return parseFiltersFromSearchParams(searchParams);
  }, [searchParams]);

  const { data, loading, error } = useQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GetCharactersDocument, {
    variables: { filter: currentFilters },
    notifyOnNetworkStatusChange: true,
  });

  const handleApplyFilters = useCallback(
    (newFilters: FilterCharacter) => {
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      router.push(`/rick-and-morty?${params.toString()}`);
    },
    [router]
  );

  const displayData = data ?? initialData;
  const displayError = error?.message;

  const showMainLoading =
    loading &&
    (!displayData?.characters?.results ||
      displayData.characters.results.length === 0);

  const showError =
    !!displayError &&
    !showMainLoading &&
    (!displayData?.characters?.results ||
      displayData.characters.results.length === 0);

  const charactersToShow =
    displayData?.characters?.results?.filter(
      (c): c is Character => c !== null
    ) ?? [];

  const hasDataToShow = charactersToShow.length > 0;

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <CharacterFilterBar
        initialAppliedFilters={currentFilters}
        onApplyFilters={handleApplyFilters}
      />

      {showMainLoading && (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" tip="Loading characters..." />
        </div>
      )}

      {showError && (
        <Alert
          message="Error loading characters"
          description={displayError}
          type="error"
          showIcon
        />
      )}

      {!showError && hasDataToShow && (
        <CharacterList characters={charactersToShow} />
      )}

      {!showMainLoading && !showError && !hasDataToShow && (
        <Alert
          message="No characters found matching your criteria."
          type="info"
        />
      )}
    </Space>
  );
}
