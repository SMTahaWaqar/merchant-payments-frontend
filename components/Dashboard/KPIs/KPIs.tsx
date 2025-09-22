"use client";
import styles from "./KPIs.module.css";
import Sparkline from "@/components/Sparkline/Sparkline";
import { fmtMoney, fmtNum } from "@/lib/format";
import { Order } from "@/lib/order";

function calcStats(rows: Order[]) {
  const now = Date.now();
  const dayAgo = now - 24 * 3600 * 1000;
  const last24 = rows.filter((r) => new Date(r.createdAt).getTime() >= dayAgo);
  const volume24 = last24.reduce((s, r) => s + Number(r.fiatAmount), 0);
  const avgTicket = rows.length
    ? rows.reduce((s, r) => s + Number(r.fiatAmount), 0) / rows.length
    : 0;
  const orders24 = last24.length;
  // static
  const spark = [1, 1.1, 0.95, 1.3, 1.15, 1.25, 1.4].map(
    (v) => v * (1 + orders24 / 200)
  );
  return { volume24, orders24, avgTicket, spark };
}

export default function KPIs({ rows }: { rows: Order[] }) {
  const { volume24, orders24, avgTicket, spark } = calcStats(rows);
  return (
    <div className={styles.grid}>
      <div className={`${styles.tile} ${styles.card}`}>
        <div className={styles.label}>Total Volume (24h)</div>
        <div className={styles.value}>{fmtMoney(volume24)}</div>
        <div className={styles.sub}>+5.3% vs prev</div>
        <Sparkline values={spark} />
      </div>
      <div className={`${styles.tile} ${styles.card}`}>
        <div className={styles.label}>Orders (24h)</div>
        <div className={styles.value}>{fmtNum(orders24)}</div>
        <div className={styles.sub}>Auth rate 99.2%</div>
      </div>
      <div className={`${styles.tile} ${styles.card}`}>
        <div className={styles.label}>Avg Ticket</div>
        <div className={styles.value}>{fmtMoney(avgTicket)}</div>
        <div className={styles.sub}>Median $54.10</div>
      </div>
    </div>
  );
}
