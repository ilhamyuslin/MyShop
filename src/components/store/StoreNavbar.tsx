import Link from "next/link";
import { ShoppingCart, HelpCircle, User, Shield } from "lucide-react";

export function StoreNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur dark:bg-slate-900/95 dark:border-slate-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#2d5a43]">
            MyShop
          </span>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">
            Produk
          </Link>
          <Link href="/orders" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">
            Pesanan Saya
          </Link>
          <Link href="/help" className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">
            <HelpCircle className="w-4 h-4" />
            Bantuan
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 transition"
          >
            <Shield className="w-3.5 h-3.5" />
            Admin Panel
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center justify-center p-2 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
            aria-label="Keranjang"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2d5a43] text-[10px] font-bold text-white">
              0
            </span>
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2d5a43] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#224734] transition"
          >
            <User className="w-3.5 h-3.5" />
            Masuk
          </Link>
        </div>
      </div>
    </header>
  );
}
