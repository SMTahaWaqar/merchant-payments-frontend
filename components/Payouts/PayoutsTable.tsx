"use client";
import { Table, Modal, InputNumber, Select } from "antd";
import Button from "@/components/UI/Button/Button";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";

type Row = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
};
type Props = {
  rows: Row[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number, s: number) => void;
  onRefresh: () => void;
  onRequest: (amt: number, cur: string) => Promise<void>;
  onSend: (id: string) => Promise<void>;
};

export default function PayoutsTable({
  rows,
  total,
  page,
  pageSize,
  onPageChange,
  onRefresh,
  onRequest,
  onSend,
}: Props) {
  const [open, setOpen] = useState(false);
  const [amt, setAmt] = useState<number>(100);
  const [cur, setCur] = useState("USD");

  const cols = [
    { title: "ID", dataIndex: "id", render: (v: string) => v.slice(0, 8) },
    {
      title: "Amount",
      render: (_: unknown, r: Row) => `${r.amount.toFixed(2)} ${r.currency}`,
    },
    { title: "Status", dataIndex: "status" },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (v: string) => new Date(v).toLocaleString(),
    },
    {
      title: "Actions",
      render: (_: unknown, r: Row) => (
        <Button onClick={() => onSend(r.id)} disabled={r.status !== "PENDING"}>
          Mark Sent
        </Button>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Request Payout
        </Button>
        <Button onClick={onRefresh}>Refresh</Button>
      </div>
      <Table
        rowKey="id"
        columns={cols as ColumnsType<Row> | undefined}
        dataSource={rows}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          onChange: onPageChange,
        }}
      />
      <Modal
        title="Request Payout"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={async () => {
          await onRequest(amt, cur);
          setOpen(false);
        }}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <div>Amount</div>
          <InputNumber
            value={amt}
            onChange={(v) => setAmt(Number(v))}
            min={1}
          />
          <div>Currency</div>
          <Select
            value={cur}
            onChange={
              setCur as
                | ((
                    value: string,
                    option?: { value: string } | { value: string }[] | undefined
                  ) => void)
                | undefined
            }
            options={[{ value: "USD" }, { value: "PKR" }, { value: "EUR" }]}
          />
        </div>
      </Modal>
    </>
  );
}
