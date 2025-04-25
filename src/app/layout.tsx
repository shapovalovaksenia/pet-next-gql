import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ApolloProvider } from "../providers/ApolloProvider";
import MainLayout from "@/components/layout/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ApolloProvider>
            <MainLayout>{children}</MainLayout>
          </ApolloProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
