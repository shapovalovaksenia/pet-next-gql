"use client";

import { Typography } from "antd";
const { Title, Paragraph } = Typography;
import styles from "../page.module.css";
export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Title>About</Title>
      <Paragraph>
        This is a Next.js project using Ant Design, Redux Toolkit, and Apollo
        Client (client-side) with the GitHub GraphQL API.
      </Paragraph>
    </div>
  );
}
