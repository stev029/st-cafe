"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";
import "../globals.css";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { name: "Home", href: "/dashboard" },
  { name: "Users", href: "/dashboard/users" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Menu", href: "/dashboard/menus" },
  { name: "Barang", href: "/dashboard/goods" },
  { name: "Laporan", href: "/dashboard/reports" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 bg-zinc-900 text-white p-6 flex flex-col gap-4">
        <h2 className="font-bold text-2xl mb-8">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(`text-white hover:bg-zinc-800 rounded px-3 py-2 transition-colors`,
                { "font-bold": item.href === pathname }
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 bg-zinc-100 p-8">{children}</main>
    </div>
  );
}
