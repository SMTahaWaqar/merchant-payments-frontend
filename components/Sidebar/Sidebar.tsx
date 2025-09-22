"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  ApiOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import clsx from "clsx";

const items = [
  { href: "/", label: "Dashboard", icon: <DashboardOutlined /> },
  { href: "/orders", label: "Orders", icon: <ShoppingCartOutlined /> },
  { href: "/payouts", label: "Payouts", icon: <DollarOutlined /> },
  { href: "/settings", label: "Settings", icon: <SettingOutlined /> },
  { href: "/developer", label: "API & Webhooks", icon: <ApiOutlined /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className={styles.root}>
      <div className={styles.brand}>
        <div className={styles.brandBadge} />
        <div className={styles.brandName}>MerchantPay</div>
      </div>
      <nav className={styles.nav}>
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className={clsx(
              styles.link,
              pathname === it.href && styles.linkActive
            )}
          >
            {it.icon}
            <span>{it.label}</span>
          </Link>
        ))}
      </nav>
      <div className={styles.footer}>v0.1 • demo</div>
    </div>
  );
}
