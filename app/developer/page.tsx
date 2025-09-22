"use client";
import AppShell from "@/components/AppShell/AppShell";
import WebhooksPanel from "@/components/Developer/WebhooksPanel";

export default function DeveloperPage() {
  return (
    <AppShell>
      <WebhooksPanel />
    </AppShell>
  );
}
