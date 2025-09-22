"use client";
import clsx from "clsx";
import styles from "./Pill.module.css";

type Tone = "green" | "teal" | "gold" | "dim";

export default function Pill({
  tone = "green",
  children,
}: {
  tone?: Tone;
  children: React.ReactNode;
}) {
  return <span className={clsx(styles.pill, styles[tone])}>{children}</span>;
}
