"use client";
import { Order } from "@/lib/order";
import styles from "./LiveFeed.module.css";
import { fmtMoney, fmtTime } from "@/lib/format";

export default function LiveFeed({ rows }: { rows: Order[] }) {
  const latest = [...rows]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 10);
  return (
    <div className={styles.card}>
      <div className={styles.title}>Live Activity</div>
      {latest.map((r) => {
        const cls =
          r.status === "CONFIRMED"
            ? styles.ok
            : r.status === "FAILED"
            ? styles.fail
            : styles.pend;
        return (
          <div key={r.id} className={styles.item}>
            <div className={styles.row}>
              <span className={`${styles.badge} ${cls}`} />
              <span className={styles.id}>{r.id.slice(0, 8)}</span>
              <span className={styles.addr}>
                {r.cryptoAmount} {r.cryptoSymbol} •{" "}
                {fmtMoney(
                  Number(r.fiatAmount),
                  r.fiatCurrency as "USD" | "PKR" | "EUR" | undefined
                )}
              </span>
            </div>
            <div className={styles.addr}>{fmtTime(r.createdAt)}</div>
          </div>
        );
      })}
      {!latest.length && <div className={styles.addr}>Feed incoming…</div>}
    </div>
  );
}
