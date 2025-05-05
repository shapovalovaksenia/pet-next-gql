"use client";
import React from "react";
import dynamic from "next/dynamic";
import type { Media } from "@/graphql/generated/anilist";
import { Spin } from "antd";
import type { Column as G2Column } from "@antv/g2plot";

interface PlotClickEvent {
  data?: {
    data?: {
      originalData?: Media;
    };
  };
}

interface AnimeChartProps {
  mediaList: Array<Media | null | undefined>;
  onColumnClick: (media: Media) => void;
}

const Column = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Column),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Spin tip="Loading Chart..." />
      </div>
    ),
  }
);

const AnimeChart: React.FC<AnimeChartProps> = ({
  mediaList,
  onColumnClick,
}) => {
  const chartData = mediaList
    .filter(
      (media): media is Media =>
        !!media &&
        media.averageScore !== null &&
        media.averageScore !== undefined
    )
    .map((media) => ({
      id: media.id,
      title: media.title?.romaji ?? media.title?.english ?? "Unknown Title",
      averageScore: media.averageScore ?? 0,
      originalData: media,
    }))
    .sort((a, b) => a.averageScore - b.averageScore);

  const config = {
    data: chartData,
    xField: "averageScore",
    yField: "title",
    height: 300,
    xAxis: { title: { text: 'Average Score ("ABV")' } },
    yAxis: {
      title: { text: "Anime Title" },
      label: {
        formatter: (text: string) =>
          text.length > 25 ? text.substring(0, 22) + "..." : text,
      },
    },
    tooltip: { title: "title", fields: ["averageScore"] },
    interactions: [{ type: "element-active" }],
    padding: "auto",
    appendPadding: [0, 0, 20, 0],
    rawFields: ["originalData"],
  };

  return (
    <Column
      {...config}
      onReady={(plot: G2Column) => {
        plot.on("click", (evt: PlotClickEvent) => {
          const dataItem = (evt?.data?.data as { originalData?: Media }) ?? {};
          const originalMediaData = dataItem.originalData;

          if (originalMediaData) {
            onColumnClick(originalMediaData);
          } else {
            console.warn("Original media data not found in chart click event.");
          }
        });
      }}
    />
  );
};

export default AnimeChart;
