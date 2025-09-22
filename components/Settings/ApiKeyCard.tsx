"use client";
import { Card, message } from "antd";
import Button from "@/components/UI/Button/Button";
import { getKey, rotateKey } from "@/lib/admin";
import useSWR from "swr";

export default function ApiKeyCard() {
  const { data, mutate, isLoading } = useSWR("/settings/api-key", getKey);

  const masked = data?.keyMasked || "************----";
  return (
    <Card title="API Key">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <code style={{ fontSize: 14 }}>{masked}</code>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(masked);
            message.success("Copied");
          }}
        >
          Copy
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            await rotateKey();
            message.success("Rotated");
            mutate();
          }}
        >
          Rotate
        </Button>
      </div>
      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 8 }}>
        Show/rotate your secret key (masked for demo).
      </div>
    </Card>
  );
}
