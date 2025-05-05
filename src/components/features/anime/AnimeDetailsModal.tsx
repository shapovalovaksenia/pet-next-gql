"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Modal, Typography, Descriptions, Tag, Space } from "antd";

import type { Media } from "@/graphql/generated/anilist";

import ExternalLink from "@/components/common/ExternalLink";

import { formatFuzzyDate, stripHtml } from "@/helpers/utils";

const { Title, Paragraph } = Typography;

interface AnimeDetailsModalProps {
  media: Media | null | undefined;
  visible: boolean;
  onClose: () => void;
}

const AnimeDetailsModal: React.FC<AnimeDetailsModalProps> = ({
  media,
  visible,
  onClose,
}) => {
  const modalTitle = useMemo(
    () => media?.title?.romaji ?? media?.title?.english ?? "Details",
    [media?.title]
  );
  const formattedStartDate = useMemo(
    () => formatFuzzyDate(media?.startDate),
    [media?.startDate]
  );
  const coverImageUrl = useMemo(
    () => media?.coverImage?.large ?? media?.coverImage?.medium,
    [media?.coverImage]
  );
  const cleanDescription = useMemo(
    () => stripHtml(media?.description),
    [media?.description]
  );
  const scoreDisplay = useMemo(
    () => (media?.averageScore ? `${media.averageScore} / 100` : "-"),
    [media?.averageScore]
  );
  const genresList = useMemo(() => {
    const sourceGenres = media?.genres ?? [];

    const stringGenres = sourceGenres.filter(
      (g): g is string => typeof g === "string"
    );

    return stringGenres;
  }, [media?.genres]);

  if (!media) {
    return null;
  }

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          {modalTitle}
        </Title>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Descriptions bordered column={1} size="small" layout="horizontal">
        {coverImageUrl && (
          <Descriptions.Item label="Cover" labelStyle={{ width: "130px" }}>
            <Image
              src={coverImageUrl}
              alt={`${modalTitle} Cover`}
              width={120}
              height={170}
              style={{ objectFit: "cover", display: "block" }}
              priority={false}
            />
          </Descriptions.Item>
        )}

        <Descriptions.Item label="Title (English)">
          {media.title?.english ?? "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Avg. Score (ABV)">
          {scoreDisplay}
        </Descriptions.Item>

        <Descriptions.Item label="Start Date">
          {formattedStartDate}
        </Descriptions.Item>

        <Descriptions.Item label="Description">
          <Paragraph
            ellipsis={{
              rows: 5,
              expandable: true,
              symbol: "more",
            }}
            style={{ marginBottom: 0 }}
          >
            {cleanDescription}
          </Paragraph>
        </Descriptions.Item>

        <Descriptions.Item label="Genres ('Tips')">
          {genresList.length > 0 ? (
            <Space wrap size={[0, 8]}>
              {genresList.map((genre) => (
                <Tag key={genre}>{genre}</Tag>
              ))}
            </Space>
          ) : (
            "-"
          )}
        </Descriptions.Item>

        {media.siteUrl && (
          <Descriptions.Item label="AniList Page">
            <ExternalLink href={media.siteUrl}>
              View details on AniList
            </ExternalLink>
          </Descriptions.Item>
        )}
      </Descriptions>
    </Modal>
  );
};

export default AnimeDetailsModal;
