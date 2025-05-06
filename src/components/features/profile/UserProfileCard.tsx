import React from "react";
import { Card, Avatar, Typography, Space } from "antd";
import type { GetUserProfileQuery } from "@/graphql/generated/github";
import ExternalLink from "@/components/common/ExternalLink";
const { Title, Paragraph } = Typography;

interface UserProfileCardProps {
  viewer: GetUserProfileQuery["viewer"] | null | undefined;
}

export default function UserProfileCard({ viewer }: UserProfileCardProps) {
  if (!viewer) {
    return null;
  }

  const avatarUrl = viewer.avatarUrl as string | undefined;
  const profileUrl = viewer.url as string | undefined;

  return (
    <Card>
      <Space align="center">
        <Avatar size={64} src={avatarUrl} />
        <Title level={4} style={{ margin: 0 }}>
          {viewer.name || viewer.login}{" "}
          <ExternalLink href={profileUrl}>({viewer.login})</ExternalLink>
        </Title>
      </Space>
      <Paragraph style={{ marginTop: 8 }}>{viewer.bio ?? "No bio."}</Paragraph>

      {viewer.email && <Paragraph>Email: {viewer.email}</Paragraph>}
    </Card>
  );
}
