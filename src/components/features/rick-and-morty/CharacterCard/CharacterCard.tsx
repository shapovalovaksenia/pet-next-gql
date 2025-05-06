"use client";

import React from "react";
import Image from "next/image";
import { Card, Tag, Typography, List, Space } from "antd";
import type { Character } from "@/graphql/generated/rickmorty";
import styles from "./CharacterCard.module.css";

const { Text } = Typography;

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const locationName = character.location?.name ?? "Unknown";
  const episodeNames =
    character.episode?.map((e) => e?.name).filter(Boolean) ?? [];
  const imageUrl = character.image;

  return (
    <Card hoverable className={styles.card}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <Image
            alt={character.name ?? "Character Image"}
            src={imageUrl}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, (max-width: 1200px) 25vw, 20vw"
            priority={false}
          />
        </div>
      )}
      <div className={styles.content}>
        <Card.Meta
          title={character.name ?? "Unnamed"}
          description={
            <Space
              direction="vertical"
              size="small"
              className={styles.metaDescription}
            >
              <div>
                <Tag
                  color={
                    character.status === "Alive"
                      ? "#4E6813"
                      : character.status === "Dead"
                      ? "#74070E"
                      : "default"
                  }
                >
                  {character.status ?? "Unknown"}
                </Tag>

                <Text type="secondary">
                  {character.species ?? "Unknown Species"}
                </Text>
              </div>

              {character.type && <Text>Type: {character.type}</Text>}

              <Text>Gender: {character.gender ?? "Unknown"}</Text>

              <Text>Last Location: {locationName}</Text>

              {episodeNames.length > 0 && (
                <div style={{ marginTop: "auto" }}>
                  <Text strong>Episodes:</Text>

                  <List
                    size="small"
                    dataSource={episodeNames}
                    renderItem={(item) => (
                      <List.Item className={styles.episodeListItem}>
                        {item}
                      </List.Item>
                    )}
                    className={styles.episodeList}
                  />
                </div>
              )}
            </Space>
          }
        />
      </div>
    </Card>
  );
};

export default CharacterCard;
