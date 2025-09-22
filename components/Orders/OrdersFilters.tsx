"use client";
import styles from "./OrdersFilters.module.css";
import { Select, Input } from "antd";
import Button from "@/components/UI/Button/Button";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Props = { onRefresh: () => void };

export default function OrdersFilters({ onRefresh }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [status, setStatus] = useState<string>(sp.get("status") || "");
  const [symbol, setSymbol] = useState<string>(sp.get("symbol") || "");
  const [q, setQ] = useState<string>(sp.get("q") || "");

  const params = useMemo(() => new URLSearchParams(sp.toString()), [sp]);

  function apply() {
    if (status) params.set("status", status);
    else params.delete("status");
    if (symbol) params.set("symbol", symbol);
    else params.delete("symbol");
    if (q) params.set("q", q);
    else params.delete("q");
    params.set("page", "1");
    router.push(`/orders?${params.toString()}`);
  }

  return (
    <div className={styles.wrap}>
      <Select
        value={status || undefined}
        onChange={(v) => setStatus(v)}
        allowClear
        placeholder="Status"
        options={[
          { value: "PENDING", label: "Pending" },
          { value: "CONFIRMED", label: "Confirmed" },
          { value: "FAILED", label: "Failed" },
          { value: "REFUNDED", label: "Refunded" },
        ]}
        style={{ minWidth: 140 }}
      />
      <Select
        value={symbol || undefined}
        onChange={(v) => setSymbol(v)}
        allowClear
        placeholder="Symbol"
        options={[
          { value: "BTC", label: "BTC" },
          { value: "ETH", label: "ETH" },
          { value: "SOL", label: "SOL" },
        ]}
        style={{ minWidth: 120 }}
      />
      <Input
        placeholder="Search by ID or address"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ maxWidth: 280 }}
      />
      <Button variant="primary" onClick={apply}>
        Apply
      </Button>

      <div className={styles.spacer} />
      <Button
        variant="subtle"
        icon={<ReloadOutlined />}
        onClick={onRefresh}
        aria-label="Refresh"
      />
    </div>
  );
}
