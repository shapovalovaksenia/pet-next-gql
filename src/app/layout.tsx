import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ApolloProvider } from "../providers/ApolloProvider";
import MainLayout from "@/components/layout/MainLayout";
import StoreProvider from "@/providers/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <StoreProvider>
            <ApolloProvider>
              <MainLayout>{children}</MainLayout>
            </ApolloProvider>
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
