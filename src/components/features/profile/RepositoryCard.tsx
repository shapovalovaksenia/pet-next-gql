import React from "react";
import { Card, Button, Tag, Typography, Alert } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import type { GetUserProfileQuery } from "@/graphql/generated";

const { Paragraph } = Typography;

interface RepositoryCardProps {
  repository: GetUserProfileQuery["repository"] | null | undefined;
  isLoading: boolean;
  isDisabled: boolean;
  onStarClick: () => void;
}

export default function RepositoryCard({
  repository,
  isLoading,
  isDisabled,
  onStarClick,
}: RepositoryCardProps) {
  if (!repository) {
    return (
      <Alert
        message={`Could not load repository data. Check PAT permissions ('repo' scope).`}
        type="warning"
        showIcon
      />
    );
  }

  const repoUrl = repository.url as string | undefined;
  const pushedAtDate = repository.pushedAt
    ? new Date(repository.pushedAt).toLocaleDateString()
    : null;

  return (
    <Card
      title={
        repoUrl ? (
          <a href={repoUrl} target="_blank" rel="noopener noreferrer">
            {repository.nameWithOwner}
          </a>
        ) : (
          repository.nameWithOwner
        )
      }
      extra={
        <Button
          icon={
            repository.viewerHasStarred ? (
              <StarFilled style={{ color: "#fadb14" }} />
            ) : (
              <StarOutlined />
            )
          }
          onClick={onStarClick}
          loading={isLoading}
          disabled={isDisabled}
        >
          {repository.viewerHasStarred ? "Starred" : "Star"}
          <Tag style={{ marginLeft: 8 }}>{repository.stargazerCount}</Tag>
        </Button>
      }
    >
      <Paragraph>{repository.description ?? "No description."}</Paragraph>
      {repository.primaryLanguage && (
        <Tag color={repository.primaryLanguage.color ?? undefined}>
          {repository.primaryLanguage.name}
        </Tag>
      )}
      <Tag>Private: {repository.isPrivate ? "Yes" : "No"}</Tag>
      {pushedAtDate && <Tag>Last push: {pushedAtDate}</Tag>}
    </Card>
  );
}
