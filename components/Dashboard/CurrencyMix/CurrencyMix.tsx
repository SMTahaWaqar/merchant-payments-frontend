"use client";
import styles from "./CurrencyMix.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { fmtNum } from "@/lib/format";
import { Order } from "@/lib/order";

const COLORS = ["#7ae3ff", "#ffd36b", "#ff9d6b", "#9a8cff", "#18d694"];

export default function CurrencyMix({ rows }: { rows: Order[] }) {
  const bySym = new Map<string, number>();
  rows.forEach((r) => {
    const k = r.cryptoSymbol.toUpperCase();
    bySym.set(k, (bySym.get(k) || 0) + Number(r.fiatAmount));
  });
  const data = Array.from(bySym.entries()).map(([name, value]) => ({
    name,
    value,
  }));
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className={styles.card}>
      <div>
        <div className={styles.title}>Currency Mix</div>
        <div className={styles.legend}>
          {data.map((d, i) => (
            <div key={d.name} className={styles.row}>
              <span
                className={styles.swatch}
                style={{ background: COLORS[i % COLORS.length] }}
              />
              <span>{d.name}</span>
              <span className={styles.note}>
                {fmtNum((d.value / Math.max(1, total)) * 100)}%
              </span>
            </div>
          ))}
          {!data.length && <div className={styles.note}>No data yet</div>}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={50}
            outerRadius={80}
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
