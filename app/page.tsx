"use client";
import AppShell from "@/components/AppShell/AppShell";
import KPIs from "@/components/Dashboard/KPIs/KPIs";
import LiveFeed from "@/components/Dashboard/LiveFeed/LiveFeed";
import CurrencyMix from "@/components/Dashboard/CurrencyMix/CurrencyMix";
import OrdersMini from "@/components/OrdersMini/OrdersMini";
import { useOrders } from "@/lib/order";

import styles from "./page.module.css";

export default function Page() {
  const { rows, isLoading } = useOrders();
  return (
    <AppShell>
      <div className="section-gap" />
      <KPIs rows={rows} />

      <div className={styles.grid}>
        <CurrencyMix rows={rows} />
        <LiveFeed rows={rows} />
        <div className={styles.full}>
          <OrdersMini rows={rows} />
        </div>
      </div>
    </AppShell>
  );
}
