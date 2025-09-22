import OrdersPageClient from "@/app/orders/OrdersPageClient";
import { Suspense } from "react";

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading orders…</div>}>
      <OrdersPageClient />
    </Suspense>
  );
}
