"use client";

import React from "react";
import { List } from "antd";
import type { Character } from "@/graphql/generated/rickmorty";
import CharacterCard from "./CharacterCard";

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 6,
      }}
      dataSource={characters}
      renderItem={(character) => (
        <List.Item key={character.id}>
          <CharacterCard character={character} />
        </List.Item>
      )}
      locale={{ emptyText: "No characters found matching your criteria." }}
    />
  );
};

export default CharacterList;
