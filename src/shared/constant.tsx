import Link from "next/link";
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

export const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
export const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_PAT;

export const menuItems = [
  { key: "/", icon: <HomeOutlined />, label: <Link href="/">Home</Link> },
  {
    key: "/about",
    icon: <InfoCircleOutlined />,
    label: <Link href="/about">About</Link>,
  },
  {
    key: "/profile",
    icon: <UserOutlined />,
    label: <Link href="/profile">Profile</Link>,
  },
];
