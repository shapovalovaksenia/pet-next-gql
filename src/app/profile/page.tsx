"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  GetUserProfileDocument,
  AddStarDocument,
  RemoveStarDocument,
} from "@/graphql/generated";

import type {
  GetUserProfileQuery,
  AddStarMutation,
  AddStarMutationVariables,
  RemoveStarMutation,
  RemoveStarMutationVariables,
} from "@/graphql/generated";

import { Typography, Spin, Space, message } from "antd";

import UserProfileCard from "@/components/features/profile/UserProfileCard";
import RepositoryCard from "@/components/features/profile/RepositoryCard";

const { Title } = Typography;

export default function ProfilePage() {
  const [isStarringLoading, setIsStarringLoading] = useState(false);

  const { data, loading, error, refetch } = useQuery<GetUserProfileQuery>(
    GetUserProfileDocument
  );

  useEffect(() => {
    if (error) {
      console.error("GraphQL Query Error in ProfilePage:", error);
      throw error;
    }

    if (!loading && !error && !data?.viewer) {
      console.error("Critical data missing after load: viewer is undefined");
      throw new Error(
        "Could not load essential user profile data. Please check API token permissions or try again later."
      );
    }
  }, [error, loading, data?.viewer]);

  const [addStarMutation] = useMutation<
    AddStarMutation,
    AddStarMutationVariables
  >(AddStarDocument, {
    onCompleted: () => {
      message.success("Star added!");
      refetch();
    },
    onError: (mutationError) => {
      console.error("Add Star Mutation Error:", mutationError);
      message.error(`Failed to add star: ${mutationError.message}`);
    },
  });

  const [removeStarMutation] = useMutation<
    RemoveStarMutation,
    RemoveStarMutationVariables
  >(RemoveStarDocument, {
    onCompleted: () => {
      message.success("Star removed!");
      refetch();
    },
    onError: (mutationError) => {
      console.error("Remove Star Mutation Error:", mutationError);
      message.error(`Failed to remove star: ${mutationError.message}`);
    },
  });

  const handleStarClick = () => {
    const repoId = data?.repository?.id;

    if (!repoId) {
      message.error("Repository ID not available.");
      return;
    }

    setIsStarringLoading(true);

    const isCurrentlyStarred = data?.repository?.viewerHasStarred;
    const mutationToCall = isCurrentlyStarred
      ? removeStarMutation
      : addStarMutation;

    mutationToCall({ variables: { starrableId: repoId } })
      .catch((clientError) => {
        console.error("Error executing star mutation:", clientError);
        message.error("An error occurred while trying to update the star.");
      })
      .finally(() => {
        setIsStarringLoading(false);
      });
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="Loading your GitHub profile..." />
      </div>
    );
  }

  const { viewer, repository } = data!;

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", height: "100vh" }}
    >
      <Title>GitHub Profile</Title>

      <UserProfileCard viewer={viewer} />

      <RepositoryCard
        repository={repository}
        isLoading={isStarringLoading}
        isDisabled={isStarringLoading || !repository}
        onStarClick={handleStarClick}
      />
    </Space>
  );
}
