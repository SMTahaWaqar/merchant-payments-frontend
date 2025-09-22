"use client";
import styles from "./Topbar.module.css";
import Button from "@/components/UI/Button/Button";
import Pill from "@/components/UI/Pill/Pill";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";

export default function Topbar() {
  return (
    <header className={styles.bar}>
      <div className={styles.title}>Dashboard</div>
      <div className={styles.right}>
        <Pill tone="green">
          <span className={styles.dot} /> Live
        </Pill>
        <Button
          variant="subtle"
          icon={<ReloadOutlined />}
          aria-label="Refresh"
        />
        <Button variant="primary" icon={<PlusOutlined />}>
          Create Link
        </Button>
      </div>
    </header>
  );
}
