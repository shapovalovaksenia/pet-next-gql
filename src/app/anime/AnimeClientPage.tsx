"use client";

import React, { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { Alert, Spin, Space } from "antd";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  selectMediaCurrentPage,
  selectMediaPageSize,
  selectMediaSort,
  setMediaCurrentPage,
  setMediaPageSize,
  setMediaSort,
} from "@/store/slices/mediaPageSlice";

import { GetMediaListDocument } from "@/graphql/generated/anilist";
import type {
  GetMediaListQuery,
  GetMediaListQueryVariables,
  Media,
  MediaSort,
} from "@/graphql/generated/anilist";

import AnimeChart from "@/components/features/anime/AnimeChart";
import AnimeTable from "@/components/features/anime/AnimeTable";
import AnimeDetailsModal from "@/components/features/anime/AnimeDetailsModal";

interface AnimeClientPageProps {
  initialData: GetMediaListQuery | null;
  initialError?: string | null;
  initialTotalCount?: number;
}

export default function AnimeClientPage({
  initialData,
  initialError,
  initialTotalCount,
}: AnimeClientPageProps) {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectMediaCurrentPage);
  const pageSize = useAppSelector(selectMediaPageSize);
  const currentSort = useAppSelector(selectMediaSort);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const sortVariable: MediaSort[] | undefined = currentSort
    ? [currentSort as MediaSort]
    : undefined;

  const { data, loading, error } = useQuery<
    GetMediaListQuery,
    GetMediaListQueryVariables
  >(GetMediaListDocument, {
    variables: {
      page: currentPage,
      perPage: pageSize,
      sort: sortVariable,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "cache-and-network",
  });

  const handlePaginationChange = useCallback(
    (page: number, size: number) => {
      if (size !== pageSize) dispatch(setMediaPageSize(size));
      else if (page !== currentPage) dispatch(setMediaCurrentPage(page));
    },
    [dispatch, pageSize, currentPage]
  );

  const handleSortChange = useCallback(
    (sortKey: string | null) => {
      dispatch(setMediaSort(sortKey as MediaSort | null));
    },
    [dispatch]
  );

  const handleShowDetails = useCallback((media: Media) => {
    setSelectedMedia(media);
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedMedia(null);
  }, []);

  const displayData = data ?? initialData;

  const displayError = error?.message ?? initialError;

  const totalCount =
    initialTotalCount ?? displayData?.Page?.pageInfo?.total ?? undefined;

  const showLoading =
    loading &&
    (!displayData?.Page?.media || displayData.Page.media.length === 0);

  const showError =
    !!displayError &&
    !showLoading &&
    (!displayData?.Page?.media || displayData.Page.media.length === 0);

  const mediaListToShow: Media[] =
    displayData?.Page?.media?.filter(
      (media): media is Media => media !== null
    ) ?? [];

  const hasDataToShow = mediaListToShow.length > 0;

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <AnimeChart
        mediaList={mediaListToShow}
        onColumnClick={handleShowDetails}
      />

      {showError && (
        <Alert
          message="Error loading Anime"
          description={displayError}
          type="error"
          showIcon
        />
      )}

      {showLoading && (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" tip="Loading Anime..." />
        </div>
      )}

      {!showError && (
        <AnimeTable
          mediaList={mediaListToShow}
          loading={loading}
          currentPage={currentPage}
          pageSize={pageSize}
          totalMedia={totalCount}
          currentSort={currentSort}
          onPaginationChange={handlePaginationChange}
          onSortChange={handleSortChange}
          onShowDetails={handleShowDetails}
        />
      )}

      {!showLoading && !showError && !hasDataToShow && (
        <Alert message="No Anime found." type="info" />
      )}

      <AnimeDetailsModal
        media={selectedMedia}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </Space>
  );
}
