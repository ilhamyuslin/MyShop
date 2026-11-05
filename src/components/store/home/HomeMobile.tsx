"use client";

import Link from "next/link";
import { Search, Star, Plus, Bell, ShieldCheck, Flame } from "lucide-react";
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS, Product } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import styles from "@/styles/store/home.mobile.module.css";

export function HomeMobile() {
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountPrice ?? product.price,
      image: product.images[0],
    });
  };

  return (
    <div className={styles.mobileContainer}>
      {/* Sticky Top Mobile Header & Search */}
      <header className={styles.searchHeader}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari produk casual..."
            className={styles.mobileSearchInput}
          />
        </div>
        <Link
          href="/admin/dashboard"
          className="p-2 rounded-full bg-slate-100 text-slate-700"
          title="Admin Mode"
        >
          <ShieldCheck className="w-5 h-5 text-blue-600" />
        </Link>
      </header>

      {/* Greeting Banner */}
      <div className="flex items-center justify-between mt-1 mb-3">
        <div>
          <span className="text-xs text-slate-500">Halo, Selamat Datang</span>
          <h1 className="text-lg font-bold text-slate-900">Temukan Gaya Santaimu</h1>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
          <Flame className="w-3 h-3 fill-amber-600 text-amber-600" /> Promo Aktif
        </span>
      </div>

      {/* Story-like Horizontal Categories */}
      <div className={styles.storyCategories}>
        {DUMMY_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${encodeURIComponent(cat.name)}`}
            className={styles.storyItem}
          >
            <div className={styles.storyAvatar}>
              <img src={cat.imageUrl} alt={cat.name} />
            </div>
            <span className={styles.storyLabel}>{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Mobile Promo Highlight Banner */}
      <div className={styles.mobileBanner}>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20">
            Diskon Kilat
          </span>
          <h2 className="text-lg font-extrabold mt-1.5 leading-snug">
            Kemeja Linen & Kicks Santai Diskon s/d 30%
          </h2>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs opacity-90">Berlaku s/d Akhir Pekan</span>
          <Link
            href="/products"
            className="px-3.5 py-1.5 rounded-full bg-white text-blue-700 text-xs font-bold"
          >
            Cek Sekarang
          </Link>
        </div>
      </div>

      {/* 2-Column Product Feed */}
      <div className="flex items-center justify-between mb-3 mt-4">
        <h3 className="text-sm font-bold text-slate-900">Rekomendasi Pilihan</h3>
        <Link href="/products" className="text-xs font-semibold text-blue-600">
          Lihat Semua
        </Link>
      </div>

      <div className={styles.mobileProductGrid}>
        {DUMMY_PRODUCTS.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className={styles.mobileProductCard}
          >
            <div className={styles.mobileImageContainer}>
              <img src={product.images[0]} alt={product.name} loading="lazy" />
              {product.badge && (
                <span className="absolute top-2 left-2 bg-white/95 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                  {product.badge}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => handleQuickAdd(e, product)}
                className={styles.mobileAddBtn}
                title="Tambah"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-2.5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[9px] font-medium text-slate-400 block truncate">
                  {product.category}
                </span>
                <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 mt-0.5">
                  {product.name}
                </h4>
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-extrabold text-blue-600">
                    {formatRupiah(product.discountPrice ?? product.price)}
                  </span>
                </div>
                {product.discountPrice && (
                  <span className="text-[10px] text-slate-400 line-through block -mt-0.5">
                    {formatRupiah(product.price)}
                  </span>
                )}

                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-300">•</span>
                  <span>{product.soldCount} laku</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

