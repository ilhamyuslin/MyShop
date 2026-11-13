"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ShoppingBag, ClipboardList, LifeBuoy, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import styles from "@/styles/store/navbar.mobile.module.css";

export function MobileBottomNav() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Katalog", href: "/products", icon: Compass },
    { label: "Keranjang", href: "/cart", icon: ShoppingBag, badge: totalItems },
    { label: "Pesanan", href: "/orders", icon: ClipboardList },
    { label: "Akun", href: "/profile", icon: User },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {mounted && typeof item.badge === "number" && item.badge > 0 && (
                <span className={styles.cartBadge}>{item.badge}</span>
              )}
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
