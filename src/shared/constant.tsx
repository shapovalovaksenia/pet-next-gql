import Link from "next/link";
import {
  HomeOutlined,
  UserOutlined,
  InfoCircleOutlined,
  ExperimentOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";

export const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
export const RICKMORTY_GRAPHQL_ENDPOINT =
  "https://rickandmortyapi.com/graphql/";
export const SPACEX_GRAPHQL_ENDPOINT =
  "https://spacex-production.up.railway.app/";
export const ANILIST_GRAPHQL_ENDPOINT = "https://graphql.anilist.co";

export const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_PAT;

export const CHARACTER_STATUSES: ReadonlyArray<string> = [
  "Alive",
  "Dead",
  "unknown",
];
export const CHARACTER_GENDERS: ReadonlyArray<string> = [
  "Female",
  "Male",
  "Genderless",
  "unknown",
];

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
  {
    key: "/rick-and-morty",
    icon: <ExperimentOutlined />,
    label: <Link href="/rick-and-morty">Rick & Morty</Link>,
  },
  {
    key: "/anime",
    icon: <PlaySquareOutlined />,
    label: <Link href="/anime">Anime List</Link>,
  },
];

export const DEFAULT_ANIME_PAGE_SIZE = 10;

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
