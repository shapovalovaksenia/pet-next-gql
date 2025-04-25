"use client";

import React from "react";
import { Layout, Menu } from "antd";
import styles from "./MainLayout.module.css";

const { Header, Content, Footer } = Layout;
import { menuItems } from "@/shared/constant";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className={styles.mainLayout}>
      <Header className={styles.header}>
        <div className={styles.logo}>PetGQL</div>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          className={styles.menu}
          defaultSelectedKeys={["/"]}
        />
      </Header>
      <Content className={styles.content}>
        <div className={styles.contentWrapper}>{children}</div>
      </Content>
      <Footer className={styles.footer}>
        Pet Project ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
