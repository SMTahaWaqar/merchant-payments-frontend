import PayoutsPageClient from "@/app/payouts/PayoutPageClient";
import { Suspense } from "react";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading orders…</div>}>
      <PayoutsPageClient />
    </Suspense>
  );
}
