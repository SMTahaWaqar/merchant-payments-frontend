"use client";
import styles from "./RingGauge.module.css";

export default function RingGauge({
  percent,
  text,
}: {
  percent: number;
  text: string;
}) {
  const angle = Math.max(0, Math.min(100, percent)) * 3.6;
  const style = { ["--angle" as string]: `${angle}deg` };
  return (
    <div className={styles.wrap}>
      <div className={styles.ring} style={style as React.CSSProperties}>
        <div className={styles.inner}>{text}</div>
      </div>
    </div>
  );
}
