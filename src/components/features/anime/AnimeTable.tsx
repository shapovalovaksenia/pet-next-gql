"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Table, Tooltip } from "antd";
import type { TableProps, TablePaginationConfig } from "antd";
import type { Media } from "@/graphql/generated/anilist";
import { MediaSort } from "@/graphql/generated/anilist";
import ExternalLink from "@/components/common/ExternalLink";
import { ClientParagraph } from "@/components/client-wrappers/AntdTypography";
import { stripHtml } from "@/helpers/utils";
import {
  getInitialSortColumnKey,
  getInitialSortOrder,
} from "@/helpers/sorting";

interface AnimeTableProps {
  mediaList: Array<Media | null | undefined>;
  loading: boolean;
  currentPage: number;
  pageSize: number;
  totalMedia?: number;
  currentSort: MediaSort | null;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSortChange: (sort: MediaSort | null) => void;
  onShowDetails: (media: Media) => void;
}

type MediaTableRow = Media & { key: React.Key };

const AnimeTable: React.FC<AnimeTableProps> = ({
  mediaList,
  loading,
  currentPage,
  pageSize,
  totalMedia,
  currentSort,
  onPaginationChange,
  onSortChange,
  onShowDetails,
}) => {
  const [tableSortOrder, setTableSortOrder] = useState<
    "ascend" | "descend" | undefined
  >(() => getInitialSortOrder(currentSort));

  const [tableSortColumnKey, setTableSortColumnKey] = useState<
    string | undefined
  >(() => getInitialSortColumnKey(currentSort));

  useEffect(() => {
    const newOrder = getInitialSortOrder(currentSort);
    const newKey = getInitialSortColumnKey(currentSort);
    setTableSortOrder(newOrder);
    setTableSortColumnKey(newKey);
  }, [currentSort]);

  const processedData: MediaTableRow[] = mediaList
    .filter((item): item is Media => Boolean(item))
    .map((media) => ({ ...media, key: media.id ?? Math.random().toString() }));

  const columns: TableProps<MediaTableRow>["columns"] = [
    {
      title: "Photo",
      dataIndex: ["coverImage", "medium"],
      key: "photo",
      width: 80,
      render: (url, record) =>
        url ? (
          <Image
            src={url}
            alt={record.title?.romaji ?? "Cover"}
            width={50}
            height={70}
            style={{ cursor: "pointer", objectFit: "cover" }}
            onClick={() => onShowDetails(record)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Name",
      dataIndex: ["title", "romaji"],
      key: "title",
      sorter: true,
      sortOrder: tableSortColumnKey === "title" ? tableSortOrder : undefined,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <ExternalLink href={record.siteUrl}>
          {text ?? record.title?.english ?? "N/A"}
        </ExternalLink>
      ),
    },
    {
      title: "Slogan / Description",
      dataIndex: "description",
      key: "description",
      ellipsis: { showTitle: false },
      render: (desc) =>
        desc ? (
          <Tooltip
            placement="topLeft"
            title={<div dangerouslySetInnerHTML={{ __html: desc }} />}
          >
            <ClientParagraph style={{ marginBottom: 0 }} ellipsis={{ rows: 2 }}>
              {stripHtml(desc)}
            </ClientParagraph>
          </Tooltip>
        ) : (
          "-"
        ),
    },
    {
      title: "Avg Score (ABV)",
      dataIndex: "averageScore",
      key: "score",
      sorter: true,
      sortOrder: tableSortColumnKey === "score" ? tableSortOrder : undefined,
      sortDirections: ["descend", "ascend"],
      render: (score) => (score ? `${score} / 100` : "-"),
      align: "right",
      width: 150,
    },
  ];

  const paginationConfig: TablePaginationConfig = {
    current: currentPage,
    pageSize,
    total: totalMedia,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "30"],
    showTotal: (total) => (total ? `Total ${total} items` : undefined),
    disabled: loading,
  };

  const handleTableChange: TableProps<MediaTableRow>["onChange"] = (
    pagination,
    _filters,
    sorter
  ) => {
    const currentTableSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    let targetSort: MediaSort | null = null;

    if (currentTableSorter && currentTableSorter.columnKey) {
      const key = currentTableSorter.columnKey as string;
      const order = currentTableSorter.order;

      if (order === "ascend") {
        if (key === "score") targetSort = MediaSort.Score;
        else if (key === "title") targetSort = MediaSort.TitleRomaji;
      } else if (order === "descend") {
        if (key === "score") targetSort = MediaSort.ScoreDesc;
        else if (key === "title") targetSort = MediaSort.TitleRomajiDesc;
      }
    }

    if (targetSort !== currentSort) {
      onSortChange(targetSort);
    }

    if (
      pagination.current !== currentPage ||
      pagination.pageSize !== pageSize
    ) {
      onPaginationChange(pagination.current ?? 1, pagination.pageSize ?? 10);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={processedData}
      loading={loading}
      pagination={paginationConfig}
      onChange={handleTableChange}
      scroll={{ x: 800 }}
    />
  );
};

export default AnimeTable;
