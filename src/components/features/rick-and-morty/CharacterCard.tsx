"use client";

import React from "react";
import Image from "next/image";
import { Card, Tag, Typography, List, Space } from "antd";
import type { Character } from "@/graphql/generated/rickmorty";

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
    <Card
      hoverable
      style={{ width: "100%" }}

      // bodyStyle={{ padding: 0 }}
    >
      {imageUrl && (
        <div style={{ position: "relative", width: "100%", height: "200px" }}>
          {" "}
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
      {/* <div style={{ padding: "16px" }}> */}
      <Card.Meta
        title={character.name ?? "Unnamed"}
        description={
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div>
              <Tag
                color={
                  character.status === "Alive"
                    ? "green"
                    : character.status === "Dead"
                    ? "red"
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
              <div>
                <Text strong>Episodes:</Text>
                <List
                  size="small"
                  dataSource={episodeNames}
                  renderItem={(item) => (
                    <List.Item style={{ padding: "2px 0" }}>{item}</List.Item>
                  )}
                  style={{
                    maxHeight: "100px",
                    overflowY: "auto",
                    paddingLeft: "5px",
                  }}
                />
              </div>
            )}
          </Space>
        }
      />
      {/* </div> */}
    </Card>
  );
};

export default CharacterCard;
