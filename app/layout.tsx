import type { Metadata } from "next";
import "./globals.css";
import "antd/dist/reset.css";
import { ConfigProvider, theme as antdTheme } from "antd";
import { swrConfig } from "@/lib/swr";
import { SWRConfig } from "swr";

export const metadata: Metadata = {
  title: "Merchant Payments Dashboard",
  description: "Accept crypto, track orders, manage payouts & webhooks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            algorithm: antdTheme.darkAlgorithm,
            token: {
              colorBgBase: "#141822",
              colorBorder: "#2a3242",
              colorTextBase: "#f2f5fb",
              colorPrimary: "#ffd36b",
              borderRadius: 14,
            },
            components: {
              Button: {
                borderRadius: 999,
                controlHeight: 36,
                fontWeight: 700,
              },
              Tag: {
                borderRadius: 999,
              },
              Card: { colorBgContainer: "var(--panel)" },
            },
          }}
        >
          <SWRConfig value={swrConfig}>{children}</SWRConfig>
        </ConfigProvider>
      </body>
    </html>
  );
}
