"use client";
import styles from "./OrdersMini.module.css";
import { fmtMoney } from "@/lib/format";
import { Order } from "@/lib/order";
import Link from "next/link";

export default function OrdersMini({ rows }: { rows: Order[] }) {
  const latest = [...rows]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 6);
  const cls = (s: string) =>
    s === "CONFIRMED" ? styles.ok : s === "FAILED" ? styles.fail : styles.pend;

  return (
    <div className={styles.card}>
      <div className={styles.title}>Recent Orders</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order</th>
            <th>Amount</th>
            <th>Crypto</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {latest.map((r) => (
            <tr key={r.id}>
              <td className={styles.id}>{r.id.slice(0, 8)}</td>
              <td>
                {fmtMoney(
                  Number(r.fiatAmount),
                  r.fiatCurrency as "USD" | "PKR" | "EUR" | undefined
                )}
              </td>
              <td>
                {r.cryptoAmount} {r.cryptoSymbol}
              </td>
              <td>
                <span className={`${styles.badge} ${cls(r.status)}`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
          {!latest.length && (
            <tr>
              <td colSpan={4}>No orders yet</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ height: 8 }} />
      <Link href="/orders">View all →</Link>
    </div>
  );
}
