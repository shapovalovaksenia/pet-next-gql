"use client";

import React, { useState, useCallback } from "react";
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

interface CharacterClientPageProps {
  serverFilters: FilterCharacter;
  initialData: GetCharactersQuery | null;
  initialError?: string | null;
}

export default function CharacterClientPage({
  serverFilters,
  initialData,
  initialError,
}: CharacterClientPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [appliedFilters] = useState<FilterCharacter>(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentFilters: FilterCharacter = {};
    if (params.get("status")) currentFilters.status = params.get("status")!;
    if (params.get("species")) currentFilters.species = params.get("species")!;
    if (params.get("gender")) currentFilters.gender = params.get("gender")!;
    if (params.get("type")) currentFilters.type = params.get("type")!;
    return Object.keys(currentFilters).length > 0
      ? currentFilters
      : serverFilters;
  });

  const { data, loading, error } = useQuery<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >(GetCharactersDocument, {
    variables: { filter: appliedFilters },
    // skip: !!initialData && !initialError,
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
  const displayError = error?.message ?? initialError;

  const showMainLoading =
    loading &&
    (!displayData?.characters?.results ||
      displayData.characters.results.length === 0);

  // const showLoading = loading && !initialData;

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
        initialAppliedFilters={appliedFilters}
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
