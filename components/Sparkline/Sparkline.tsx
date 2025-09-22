"use client";
import styles from "./Sparkline.module.css";

export default function Sparkline({
  values,
  width = 120,
  height = 36,
}: {
  values: number[];
  width?: number;
  height?: number;
}) {
  if (!values?.length)
    return <svg className={styles.svg} width={width} height={height} />;
  const min = Math.min(...values),
    max = Math.max(...values);
  const step = width / Math.max(1, values.length - 1);
  const norm = (v: number) =>
    max === min ? height / 2 : height - ((v - min) / (max - min)) * height;
  const d = values
    .map((v, i) => `${i ? "L" : "M"} ${i * step} ${norm(v)}`)
    .join(" ");
  return (
    <svg className={styles.svg} width={width} height={height} aria-hidden>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
