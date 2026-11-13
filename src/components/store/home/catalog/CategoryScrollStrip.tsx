"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Category } from "@/lib/dummy-data";
import styles from "@/styles/store/home.desktop.module.css";

interface CategoryScrollStripProps {
  categories: Category[];
}

export function CategoryScrollStrip({ categories }: CategoryScrollStripProps) {
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -460 : 460;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.categorySection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Kategori Pilihan</h2>
        <Link href="/products" className={styles.sectionLink}>
          Lihat Semua Kategori <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className={styles.categorySliderWrapper}>
        <button
          type="button"
          onClick={() => scrollCategories("left")}
          className={`${styles.sliderArrow} ${styles.sliderArrowPrev}`}
          aria-label="Geser kategori ke kiri"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div ref={categoryScrollRef} className={styles.categorySlider}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className={styles.categoryCard}
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className={styles.categoryImg}
                loading="lazy"
              />
              <div>
                <h3 className={styles.categoryName}>{cat.name}</h3>
                <p className={styles.categoryCount}>{cat.itemCount} Produk</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollCategories("right")}
          className={`${styles.sliderArrow} ${styles.sliderArrowNext}`}
          aria-label="Geser kategori ke kanan"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

