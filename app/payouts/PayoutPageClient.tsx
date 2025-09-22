"use client";
import AppShell from "@/components/AppShell/AppShell";
import PayoutsTable from "@/components/Payouts/PayoutsTable";
import useSWR from "swr";
import { listPayouts, createPayout, sendPayout } from "@/lib/admin";
import { useSearchParams, useRouter } from "next/navigation";
import { message } from "antd";

export default function PayoutsPageClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const pageSize = Math.min(100, Math.max(1, Number(sp.get("pageSize") ?? 20)));
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  }).toString();

  const { data, mutate } = useSWR(
    ["/payouts", params],
    ([, q]) => listPayouts(q),
    { refreshInterval: 15000 }
  );

  return (
    <AppShell>
      <PayoutsTable
        rows={data?.rows ?? []}
        total={data?.total ?? 0}
        page={page}
        pageSize={pageSize}
        onPageChange={(p, s) => {
          const u = new URLSearchParams(sp.toString());
          u.set("page", String(p));
          u.set("pageSize", String(s));
          router.push(`/payouts?${u}`);
        }}
        onRefresh={() => mutate()}
        onRequest={async (amt, cur) => {
          await createPayout(amt, cur);
          message.success("Payout requested");
          mutate();
        }}
        onSend={async (id) => {
          await sendPayout(id);
          message.success("Marked sent");
          mutate();
        }}
      />
    </AppShell>
  );
}
