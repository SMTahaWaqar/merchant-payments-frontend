"use client";
import AppShell from "@/components/AppShell/AppShell";
import OrdersFilters from "@/components/Orders/OrdersFilters";
import OrdersTable from "@/components/Orders/OrdersTable";
import OrderDrawer from "@/components/Orders/OrderDrawer";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import styles from "./page.module.css";
import { useState, useMemo, Suspense } from "react";
import { Order } from "@/lib/order";

type Resp = { ok: boolean; rows: Order[]; total: number };

export default function OrdersPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const pageSize = Math.min(100, Math.max(1, Number(sp.get("pageSize") ?? 20)));
  const status = sp.get("status") || "";
  const symbol = sp.get("symbol") || "";
  const q = sp.get("q") || "";

  const query = useMemo(() => {
    const p = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (status) p.set("status", status);
    if (symbol) p.set("symbol", symbol);
    if (q) p.set("q", q);
    return p.toString();
  }, [page, pageSize, status, symbol, q]);

  const { data, mutate, isLoading } = useSWR<Resp>(
    `/orders?${query}`,
    fetcher,
    { refreshInterval: 15000 }
  );

  function onPageChange(nextPage: number, nextSize: number) {
    const p = new URLSearchParams(sp.toString());
    p.set("page", String(nextPage));
    p.set("pageSize", String(nextSize));
    router.push(`/orders?${p.toString()}`);
  }

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Order | null>(null);

  return (
    <Suspense>
    <AppShell>
      <div className={styles.wrap}>
        <OrdersFilters onRefresh={() => mutate()} />
        <OrdersTable
          rows={data?.rows ?? []}
          total={data?.total ?? 0}
          page={page}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onOpen={(o) => {
            setCurrent(o);
            setOpen(true);
          }}
        />
        <OrderDrawer
          open={open}
          onClose={() => setOpen(false)}
          order={current}
          onChanged={() => mutate()}
        />
      </div>
    </AppShell>
    </Suspense>
  );
}
