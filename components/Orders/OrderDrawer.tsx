"use client";
import styles from "./OrderDrawer.module.css";
import { Drawer, message } from "antd";
import Button from "@/components/UI/Button/Button";
import { useState } from "react";
import { api } from "@/lib/fetcher";
import StatusBadge from "@/components/StatusBadge/StatusBadge";
import { fmtMoney } from "@/lib/format";
import { Order } from "@/lib/order";

type Props = {
  open: boolean;
  onClose: () => void;
  order?: Order | null;
  onChanged: () => void;
};

export default function OrderDrawer({
  open,
  onClose,
  order,
  onChanged,
}: Props) {
  const [tx, setTx] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  async function confirm() {
    if (!order) return;
    try {
      setLoading(true);
      await api.post(`/orders/${order.id}/confirm`, { txHash: tx || "0xdemo" });
      message.success("Order confirmed");
      onChanged();
      onClose();
    } catch (e: unknown) {
      if (
        e &&
        typeof e === "object" &&
        "response" in e &&
        e.response &&
        typeof e.response === "object" &&
        "data" in e.response &&
        e.response.data &&
        typeof e.response.data === "object" &&
        "error" in e.response.data
      ) {
        // @ts-expect-error: dynamic error shape
        message.error(e.response.data.error || "Failed");
      } else {
        message.error("Failed");
      }
    } finally {
      setLoading(false);
    }
  }

  async function fail() {
    if (!order) return;
    try {
      setLoading(true);
      await api.post(`/orders/${order.id}/fail`, {
        reason: reason || "manual",
      });
      message.success("Order marked failed");
      onChanged();
      onClose();
    } catch (e: unknown) {
      if (
        e &&
        typeof e === "object" &&
        "response" in e &&
        e.response &&
        typeof e.response === "object" &&
        "data" in e.response &&
        e.response.data &&
        typeof e.response.data === "object" &&
        "error" in e.response.data
      ) {
        // @ts-expect-error: dynamic error shape
        message.error(e.response.data.error || "Failed");
      } else {
        message.error("Failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer title="Order details" open={open} onClose={onClose} width={420}>
      {!order ? null : (
        <div className={styles.body}>
          <div className={styles.row}>
            <span className={styles.k}>Order</span>
            <span className={styles.v}>{order.id}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.k}>Status</span>
            <StatusBadge status={order.status} />
          </div>
          <div className={styles.row}>
            <span className={styles.k}>Fiat</span>
            <span className={styles.v}>
              {fmtMoney(
                Number(order.fiatAmount),
                order.fiatCurrency as "USD" | "PKR" | "EUR" | undefined
              )}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.k}>Crypto</span>
            <span className={styles.v}>
              {order.cryptoAmount} {order.cryptoSymbol}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.k}>Address</span>
            <span className={styles.v}>{order.address}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.k}>Network</span>
            <span className={styles.v}>{order.network}</span>
          </div>
          {order.txHash && (
            <div className={styles.row}>
              <span className={styles.k}>Tx Hash</span>
              <span className={styles.v}>{order.txHash}</span>
            </div>
          )}

          <div className={styles.note}>Actions</div>
          <div className={styles.form}>
            <input
              className={styles.input}
              placeholder="Tx Hash (for confirm)"
              value={tx}
              onChange={(e) => setTx(e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Reason (for fail)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <Button variant="subtle" onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={fail} loading={loading}>
              Mark Failed
            </Button>
            <Button variant="primary" onClick={confirm} loading={loading}>
              Confirm
            </Button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
