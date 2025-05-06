import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  URI: { input: any; output: any; }
};

export type AddStarInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  starrableId: Scalars['ID']['input'];
};

export type AddStarPayload = {
  __typename?: 'AddStarPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  starrable?: Maybe<Starrable>;
};

export type Language = {
  __typename?: 'Language';
  color?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addStar?: Maybe<AddStarPayload>;
  removeStar?: Maybe<RemoveStarPayload>;
};


export type MutationAddStarArgs = {
  input: AddStarInput;
};


export type MutationRemoveStarArgs = {
  input: RemoveStarInput;
};

export type Query = {
  __typename?: 'Query';
  repository?: Maybe<Repository>;
  viewer: User;
};


export type QueryRepositoryArgs = {
  name: Scalars['String']['input'];
  owner: Scalars['String']['input'];
};

export type RemoveStarInput = {
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  starrableId: Scalars['ID']['input'];
};

export type RemoveStarPayload = {
  __typename?: 'RemoveStarPayload';
  clientMutationId?: Maybe<Scalars['String']['output']>;
  starrable?: Maybe<Starrable>;
};

export type Repository = Starrable & {
  __typename?: 'Repository';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPrivate: Scalars['Boolean']['output'];
  nameWithOwner: Scalars['String']['output'];
  primaryLanguage?: Maybe<Language>;
  pushedAt?: Maybe<Scalars['DateTime']['output']>;
  stargazerCount: Scalars['Int']['output'];
  url: Scalars['URI']['output'];
  viewerHasStarred: Scalars['Boolean']['output'];
};

export type Starrable = {
  id: Scalars['ID']['output'];
  stargazerCount: Scalars['Int']['output'];
  viewerHasStarred: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['URI']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  login: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  url: Scalars['URI']['output'];
};

export type AddStarMutationVariables = Exact<{
  starrableId: Scalars['ID']['input'];
}>;


export type AddStarMutation = { __typename?: 'Mutation', addStar?: { __typename?: 'AddStarPayload', starrable?: { __typename?: 'Repository', id: string, viewerHasStarred: boolean, stargazerCount: number } | null } | null };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', viewer: { __typename?: 'User', login: string, name?: string | null, avatarUrl: any, url: any, bio?: string | null, email: string }, repository?: { __typename?: 'Repository', id: string, nameWithOwner: string, description?: string | null, url: any, stargazerCount: number, viewerHasStarred: boolean, isPrivate: boolean, pushedAt?: any | null, primaryLanguage?: { __typename?: 'Language', name: string, color?: string | null } | null } | null };

export type RemoveStarMutationVariables = Exact<{
  starrableId: Scalars['ID']['input'];
}>;


export type RemoveStarMutation = { __typename?: 'Mutation', removeStar?: { __typename?: 'RemoveStarPayload', starrable?: { __typename?: 'Repository', id: string, viewerHasStarred: boolean, stargazerCount: number } | null } | null };


export const AddStarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"starrableId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"starrableId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"starrableId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starrable"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Repository"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"viewerHasStarred"}},{"kind":"Field","name":{"kind":"Name","value":"stargazerCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddStarMutation, AddStarMutationVariables>;
export const GetUserProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"owner"},"value":{"kind":"StringValue","value":"shapovalovaksenia","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"StringValue","value":"pet-next-gql","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nameWithOwner"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"stargazerCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewerHasStarred"}},{"kind":"Field","name":{"kind":"Name","value":"isPrivate"}},{"kind":"Field","name":{"kind":"Name","value":"pushedAt"}},{"kind":"Field","name":{"kind":"Name","value":"primaryLanguage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const RemoveStarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveStar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"starrableId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeStar"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"starrableId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"starrableId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starrable"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Repository"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"viewerHasStarred"}},{"kind":"Field","name":{"kind":"Name","value":"stargazerCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<RemoveStarMutation, RemoveStarMutationVariables>;