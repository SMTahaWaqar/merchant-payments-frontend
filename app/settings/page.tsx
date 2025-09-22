"use client";
import AppShell from "@/components/AppShell/AppShell";
import ApiKeyCard from "@/components/Settings/ApiKeyCard";
export default function SettingsPage() {
  return (
    <AppShell>
      <ApiKeyCard />
    </AppShell>
  );
}
