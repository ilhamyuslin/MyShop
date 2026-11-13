"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import styles from "./curated-stage.module.css";

interface CuratedStageShowcaseProps {
  products: Product[];
}

export function CuratedStageShowcase({ products }: CuratedStageShowcaseProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [centerIndex, setCenterIndex] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredProducts = products.filter((prod) => {
    if (activeTab === "best") return prod.badge === "Terlaris" || prod.soldCount > 100;
    if (activeTab === "new") return prod.badge === "Baru" || prod.badge === "Trending";
    if (activeTab === "sale") return Boolean(prod.discountPrice);
    return true;
  });

  // Timer Ref Mandiri untuk Auto-Slide Koleksi Pilihan
  const stageTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetStageTimer = useCallback(() => {
    if (stageTimerRef.current) clearInterval(stageTimerRef.current);
    if (filteredProducts.length <= 1) return;
    stageTimerRef.current = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % filteredProducts.length);
    }, 5000);
  }, [filteredProducts.length]);

  useEffect(() => {
    resetStageTimer();
    return () => {
      if (stageTimerRef.current) clearInterval(stageTimerRef.current);
    };
  }, [resetStageTimer]);

  const handleStageNav = (direction: "prev" | "next" | number) => {
    if (typeof direction === "number") {
      setCenterIndex(direction);
    } else if (direction === "prev") {
      setCenterIndex((prev) => (prev > 0 ? prev - 1 : filteredProducts.length - 1));
    } else {
      setCenterIndex((prev) => (prev < filteredProducts.length - 1 ? prev + 1 : 0));
    }
    resetStageTimer(); // Reset jeda penuh 5 detik saat berinteraksi!
  };

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
    <section className="mt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Koleksi Pilihan & Produk Unggulan
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Eksplorasi gaya kasual santai yang dirancang untuk aktivitas sehari-hari
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "all", label: "Semua Unggulan" },
            { id: "best", label: "Paling Laris" },
            { id: "new", label: "Rilis Terbaru" },
            { id: "sale", label: "Spesial Promo" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setCenterIndex(0);
                resetStageTimer();
              }}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#2d5a43] text-white border-[#2d5a43] shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-[#2d5a43] hover:text-[#2d5a43]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stage Carousel with Dramatic S / M / L Hierarchy */}
      <div
        className={styles.stageSectionWrapper}
        onMouseDown={(e) => setTouchStartX(e.clientX)}
        onMouseUp={(e) => {
          if (touchStartX === null) return;
          const diff = e.clientX - touchStartX;
          if (diff > 50) handleStageNav("prev");
          else if (diff < -50) handleStageNav("next");
          setTouchStartX(null);
        }}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const diff = e.changedTouches[0].clientX - touchStartX;
          if (diff > 50) handleStageNav("prev");
          else if (diff < -50) handleStageNav("next");
          setTouchStartX(null);
        }}
      >
        <div className={styles.stageTrack}>
          {filteredProducts.map((product, idx) => {
            const count = filteredProducts.length;
            let offset = (idx - centerIndex) % count;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            let cardClass = styles.cardHidden;
            if (offset === 0) cardClass = styles.cardL;
            else if (offset === -1) cardClass = styles.cardM_prev;
            else if (offset === 1) cardClass = styles.cardM_next;
            else if (offset === -2) cardClass = styles.cardS_prev;
            else if (offset === 2) cardClass = styles.cardS_next;

            const isCenter = offset === 0;

            return (
              <div
                key={product.id}
                className={`${styles.stageCard} ${cardClass}`}
                onClick={() => {
                  if (!isCenter) handleStageNav(idx);
                }}
              >
                <div className={styles.stageImageWrap}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={styles.stageImage}
                    draggable={false}
                  />
                  {product.badge && (
                    <span className={styles.stageBadge}>{product.badge}</span>
                  )}
                </div>

                <div className={styles.stageContent}>
                  <div>
                    <span className={styles.stageCategory}>{product.category}</span>
                    <h3 className={styles.stageTitle}>{product.name}</h3>
                    <div className={styles.stagePriceRow}>
                      <span className={styles.stagePrice}>
                        {formatRupiah(product.discountPrice || product.price)}
                      </span>
                      {product.discountPrice && (
                        <span className={styles.stageOldPrice}>
                          {formatRupiah(product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.stageActionRow}>
                    <div className={styles.stageRating}>
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-[11px] text-slate-400">{product.soldCount} terjual</span>
                    </div>

                    {isCenter ? (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          className="text-xs font-semibold text-slate-500 hover:text-[#2d5a43] px-2 py-1 transition"
                        >
                          Detail
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, product)}
                          className={styles.stageCtaBtn}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>+ Keranjang</span>
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-[11px] font-semibold text-slate-400 hover:text-[#2d5a43] transition"
                      >
                        Lihat Detail
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Slide Position Dots */}
        <div className={styles.stageDots}>
          {filteredProducts.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => handleStageNav(dotIdx)}
              className={`${styles.stageDot} ${dotIdx === centerIndex ? styles.stageDotActive : ""}`}
              aria-label={`Ke produk ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

