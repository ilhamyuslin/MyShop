"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { Zap, ChevronLeft, ChevronRight, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import styles from "./flash-sale.module.css";

interface FlashSaleWidgetProps {
  products: Product[];
}

export function FlashSaleWidget({ products }: FlashSaleWidgetProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [flashSalePage, setFlashSalePage] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<{ hours: string; minutes: string; seconds: string }>({
    hours: "08",
    minutes: "42",
    seconds: "15",
  });

  const flashSaleProducts = products.filter((p) => p.discountPrice);
  const flashSalePagesCount = Math.ceil(flashSaleProducts.length / 2);

  // Countdown Timer
  useEffect(() => {
    const target = Date.now() + 8 * 3600 * 1000 + 42 * 60 * 1000 + 15 * 1000;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(sec).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer Ref Mandiri untuk Auto-Slide Flash Sale
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (flashSalePagesCount <= 1) return;
    timerRef.current = setInterval(() => {
      setFlashSalePage((prev) => (prev + 1) % flashSalePagesCount);
    }, 4000);
  }, [flashSalePagesCount]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleNav = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setFlashSalePage((prev) => (prev > 0 ? prev - 1 : flashSalePagesCount - 1));
    } else {
      setFlashSalePage((prev) => (prev < flashSalePagesCount - 1 ? prev + 1 : 0));
    }
    resetTimer(); // Reset jeda penuh 4 detik setiap kali diklik!
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
    <div className={styles.flashSaleBox}>
      {/* Header Flash Sale */}
      <div className={styles.flashSaleHeader}>
        <div className={styles.flashSaleTitleWrap}>
          <Zap className={styles.flashSaleIcon} />
          <span className={styles.flashSaleTitle}>Flash Sale</span>
          <div className={styles.flashSaleTimer}>
            <span className={styles.timerBlock}>{timeLeft.hours}</span>
            <span className={styles.timerColon}>:</span>
            <span className={styles.timerBlock}>{timeLeft.minutes}</span>
            <span className={styles.timerColon}>:</span>
            <span className={styles.timerBlock}>{timeLeft.seconds}</span>
          </div>
        </div>
        <Link href="/products?discount=true" className={styles.flashSaleSeeAll}>
          <span>Lihat Semua</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Tombol Panah Hover Tokopedia Style */}
      <button
        type="button"
        onClick={() => handleNav("prev")}
        className={`${styles.flashSaleSideArrow} ${styles.flashSaleSideArrowPrev}`}
        aria-label="Slide flash sale sebelumnya"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => handleNav("next")}
        className={`${styles.flashSaleSideArrow} ${styles.flashSaleSideArrowNext}`}
        aria-label="Slide flash sale berikutnya"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Viewport Slider Track */}
      <div className={styles.flashSaleSliderViewport}>
        <div
          className={styles.flashSaleTrack}
          style={{ transform: `translateX(-${flashSalePage * 100}%)` }}
        >
          {Array.from({ length: flashSalePagesCount }).map((_, pIdx) => {
            const pageItems = flashSaleProducts.slice(pIdx * 2, (pIdx + 1) * 2);

            return (
              <div key={pIdx} className={styles.flashSalePageSlide}>
                {pageItems.map((prod) => {
                  const discountPercent = prod.discountPrice
                    ? Math.round(((prod.price - prod.discountPrice) / prod.price) * 100)
                    : 0;

                  return (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.slug}`}
                      className={styles.flashSaleCard}
                    >
                      <div className={styles.compactImageContainer}>
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className={styles.compactImage}
                          loading="lazy"
                        />
                        {discountPercent > 0 && (
                          <span className={styles.compactDiscountTag}>-{discountPercent}%</span>
                        )}
                      </div>

                      <div className={styles.compactBody}>
                        <div>
                          <h4 className={styles.compactTitle}>{prod.name}</h4>
                          <div className={styles.compactPriceRow}>
                            <div>
                              <span className={styles.compactPrice}>
                                {formatRupiah(prod.discountPrice || prod.price)}
                              </span>
                              {prod.discountPrice && (
                                <div className={styles.compactOldPrice}>
                                  {formatRupiah(prod.price)}
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={(e) => handleQuickAdd(e, prod)}
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
                            <span className="font-semibold text-slate-700">{prod.rating}</span>
                          </div>
                          <span>{prod.soldCount} terjual</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

