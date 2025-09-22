/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, Table, message } from "antd";
import Button from "@/components/UI/Button/Button";
import useSWR from "swr";
import { listEndpoints, listDeliveries, sendTestWebhook } from "@/lib/admin";

export default function WebhooksPanel() {
  const eps = useSWR("/webhooks/endpoints", listEndpoints, {
    refreshInterval: 15000,
  });
  const dels = useSWR("/webhooks/deliveries", () => listDeliveries(50), {
    refreshInterval: 15000,
  });

  const cols = [
    {
      title: "Delivery",
      dataIndex: "id",
      render: (v: string) => v.slice(0, 8),
    },
    { title: "Status", dataIndex: "status" },
    { title: "Code", dataIndex: "responseCode" },
    { title: "ms", dataIndex: "responseMs" },
    { title: "Event", render: (_: unknown, r: any) => r.event?.type },
    {
      title: "Endpoint",
      render: (_: unknown, r: any) => r.webhookEndpoint?.url,
    },
    {
      title: "At",
      dataIndex: "createdAt",
      render: (v: string) => new Date(v).toLocaleString(),
    },
  ];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card title="Webhook Endpoint">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <code style={{ fontSize: 14 }}>
            {eps.data?.endpoints?.[0]?.url ||
              "No endpoint yet (seed one via POST /webhooks/seed)"}
          </code>
          <Button
            onClick={async () => {
              await sendTestWebhook();
              message.success("Test event sent");
              dels.mutate();
            }}
          >
            Send test event
          </Button>
        </div>
      </Card>

      <Card title="Recent Deliveries">
        <Table
          rowKey="id"
          columns={cols as any}
          dataSource={dels.data?.rows ?? []}
          pagination={false}
        />
      </Card>
    </div>
  );
}
