"use client";

import React, { FC, PropsWithChildren } from "react";
import { Layout, Menu } from "antd";
import { usePathname } from "next/navigation";
import { menuItems } from "@/shared/constant";
import styles from "./MainLayout.module.css";

const { Header, Content, Footer } = Layout;

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

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
          selectedKeys={[pathname]}
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
};

export default MainLayout;
