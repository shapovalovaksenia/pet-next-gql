"use client";

import styles from "./page.module.css";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;
export default function Home() {
  return (
    <div className={styles.page}>
      <Title>Home Page</Title>
      <Paragraph>Welcome to the project!</Paragraph>
      <Paragraph>Use the menu to navigate.</Paragraph>
    </div>
  );
}
