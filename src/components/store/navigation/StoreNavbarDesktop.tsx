"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, ChevronDown, ShieldCheck, HelpCircle, Truck, Layers, Heart, User, LogOut, Package, MapPin, Ticket } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import { useUserAuthStore } from "@/store/useUserAuthStore";
import { DUMMY_CATEGORIES } from "@/lib/dummy-data";
import styles from "@/styles/store/navbar.desktop.module.css";

export function StoreNavbarDesktop() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);
  const openAuthModal = useAuthModalStore((state) => state.openAuthModal);
  const { isLoggedIn, user, logout } = useUserAuthStore();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.navbarWrapper}>
      {/* Tier 1: Top Utility Bar */}
      <div className={styles.topBar}>
        <div className={`container mx-auto px-8 ${styles.topBarInner}`}>
          <div className={styles.topBarLeft}>
            <Link href="/help" className={styles.topLink}>
              <HelpCircle className="w-3.5 h-3.5" />
              Pusat Bantuan & Toko Care
            </Link>
            <span className={styles.topDivider} />
            <Link href="/orders" className={styles.topLink}>
              <Truck className="w-3.5 h-3.5" />
              Lacak Pesanan / Resi
            </Link>
          </div>

          <div className={styles.topBarRight}>
            <Link href="/admin/dashboard" className={`${styles.topLink} ${styles.topLinkAdmin}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              Seller / Admin Centre
            </Link>
            <span className={styles.topDivider} />
            <span className="text-slate-400">Garansi 100% Original</span>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Navigation Bar */}
      <div className={styles.mainBar}>
        <div className={`container mx-auto px-8 ${styles.mainBarInner}`}>
          {/* Brand Logo */}
          <Link href="/" className={styles.brand}>
            MyShop<span className={styles.brandDot} />
          </Link>

          {/* Category Dropdown (Tokopedia Style) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={styles.categoryBtn}
            >
              <Layers className="w-4 h-4 text-slate-500" />
              <span>Kategori</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu Popup */}
            {isCategoryOpen && (
              <div
                className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pilihan Departemen
                </div>
                {DUMMY_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#2d5a43] transition"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400">{cat.itemCount}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search Area (Wide & Dominant) */}
          <div className={styles.searchArea}>
            <form action="/products" method="GET" className={styles.searchBox}>
              <input
                type="text"
                name="q"
                placeholder="Cari di MyShop (contoh: kemeja linen, sneakers, tumbler tahan panas...)"
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchSubmitBtn} aria-label="Cari">
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Keyword Chips (Shopee Style) */}
            <div className={styles.keywordChips}>
              <span className="text-[10px] font-medium text-slate-400">Populer:</span>
              <Link href="/products?q=linen" className={styles.chip}>Kemeja Linen</Link>
              <Link href="/products?q=sneakers" className={styles.chip}>Retro Sneakers</Link>
              <Link href="/products?q=tumbler" className={styles.chip}>Tumbler Keramik</Link>
              <Link href="/products?q=sling%20bag" className={styles.chip}>Sling Bag Waterproof</Link>
              <Link href="/products?q=headphones" className={styles.chip}>ANC Headphones</Link>
            </div>
          </div>

          {/* Actions Right (Wishlist, Cart & Auth Buttons) */}
          <div className={styles.actionsRight}>
            {/* Wishlist Icon with badge */}
            <Link href="/wishlist" className={styles.cartBtn} aria-label="Wishlist Saya" title="Wishlist Saya">
              <Heart className="w-5 h-5 text-slate-800" />
              {mounted && wishlistItems > 0 && <span className={styles.cartBadge}>{wishlistItems}</span>}
            </Link>

            {/* Cart Icon with badge */}
            <Link href="/cart" className={styles.cartBtn} aria-label="Keranjang Belanja" title="Keranjang Belanja">
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              {mounted && totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
            </Link>

            <span className={styles.authDivider} />

            {/* Auth Buttons / User Profile Dropdown */}
            {mounted && isLoggedIn && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2d5a43] text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Popup Menu */}
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1"
                    onMouseLeave={() => setIsProfileMenuOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#2d5a43] transition"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Profil Saya & Alamat</span>
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#2d5a43] transition"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      <span>Pesanan Saya</span>
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#2d5a43] transition"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      <span>Wishlist ({wishlistItems})</span>
                    </Link>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Keluar Akun</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authGroup}>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className={styles.loginBtn}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className={styles.registerBtn}
                >
                  Daftar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
