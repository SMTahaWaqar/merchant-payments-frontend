"use client";
import styles from "./StatCard.module.css";
import { ReactNode } from "react";

type Props = {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  right?: ReactNode;
};
export default function StatCard({ label, value, sub, right }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.label}>{label}</div>
        {right}
      </div>
      <div className={styles.value}>{value}</div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  );
}
