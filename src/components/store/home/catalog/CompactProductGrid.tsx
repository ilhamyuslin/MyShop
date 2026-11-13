"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import { Product } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import styles from "@/styles/store/home.desktop.module.css";

interface CompactProductGridProps {
  products: Product[];
}

export function CompactProductGrid({ products }: CompactProductGridProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountPrice ?? product.price,
      image: product.images[0],
    });
  };

  return (
    <section className={styles.compactSection}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eaf3ed] text-[#2d5a43] text-[11px] font-bold mb-2">
            <span>Etalase Lengkap</span>
          </div>
          <h2 className={styles.sectionTitle}>Jelajahi Semua Produk</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Koleksi lengkap pakaian kasual, aksesoris, dan perlengkapan harian
          </p>
        </div>
      </div>

      <div className={styles.compactGrid}>
        {products.slice(0, visibleCount).map((product) => {
          const discountPercent = product.discountPrice
            ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
            : 0;

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className={styles.compactCard}
            >
              <div className={styles.compactImageContainer}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={styles.compactImage}
                  loading="lazy"
                />
                {product.badge && (
                  <span className={styles.compactBadge}>{product.badge}</span>
                )}
                {discountPercent > 0 && (
                  <span className={styles.compactDiscountTag}>-{discountPercent}%</span>
                )}
              </div>

              <div className={styles.compactBody}>
                <div>
                  <h3 className={styles.compactTitle}>{product.name}</h3>
                  <div className={styles.compactPriceRow}>
                    <div>
                      <span className={styles.compactPrice}>
                        {formatRupiah(product.discountPrice || product.price)}
                      </span>
                      {product.discountPrice && (
                        <div className={styles.compactOldPrice}>
                          {formatRupiah(product.price)}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={styles.compactCartBtn}
                      title="Tambah ke Keranjang"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className={styles.compactMetaRow}>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-700">{product.rating}</span>
                  </div>
                  <span>{product.soldCount} terjual</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {visibleCount < products.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((prev) => prev + 6)}
          className={styles.loadMoreBtn}
        >
          Muat Produk Lainnya <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </section>
  );
}

