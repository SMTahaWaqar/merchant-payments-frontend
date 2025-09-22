"use client";
import styles from "./StatusBadge.module.css";
type S = "PENDING" | "CONFIRMED" | "FAILED" | "REFUNDED" | string;

export default function StatusBadge({ status }: { status: S }) {
  const tone =
    status === "CONFIRMED"
      ? styles.ok
      : status === "FAILED"
      ? styles.fail
      : status === "REFUNDED"
      ? styles.ref
      : styles.pend;
  return (
    <span className={`${styles.badge} ${tone}`}>
      <span className={styles.dot} />
      {status}
    </span>
  );
}
