"use client";
import styles from "./OrdersTable.module.css";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { fmtMoney } from "@/lib/format";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import { Order } from "@/lib/order";

type Props = {
  rows: Order[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  onOpen: (o: Order) => void;
};

export default function OrdersTable({
  rows,
  total,
  page,
  pageSize,
  onPageChange,
  onOpen,
}: Props) {
  const columns: ColumnsType<Order> = [
    {
      title: "Order",
      dataIndex: "id",
      key: "id",
      render: (_, r) => <span className={styles.id}>{r.id.slice(0, 8)}</span>,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, r) =>
        new Date(r.createdAt).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          month: "short",
          day: "2-digit",
        }),
    },
    {
      title: "Fiat",
      key: "fiat",
      render: (_, r) =>
        fmtMoney(
          Number(r.fiatAmount),
          r.fiatCurrency as "USD" | "PKR" | "EUR" | undefined
        ),
    },
    {
      title: "Crypto",
      key: "crypto",
      render: (_, r) => `${r.cryptoAmount} ${r.cryptoSymbol}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, r) => <StatusBadge status={r.status} />,
    },
  ];

  const pagination: TablePaginationConfig = {
    current: page,
    pageSize,
    total,
    showSizeChanger: true,
    onChange: onPageChange,
  };

  return (
    <div className={styles.card}>
      <div className={styles.title}>Orders</div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={rows}
        pagination={pagination}
        onRow={(record) => ({ onClick: () => onOpen(record) })}
      />
    </div>
  );
}
