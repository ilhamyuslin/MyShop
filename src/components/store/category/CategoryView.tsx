"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ChevronRight,
  ShoppingBag,
  SlidersHorizontal,
  RotateCcw,
  Check,
  SearchX,
  Sparkles,
} from "lucide-react";
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS, Product, Category } from "@/lib/dummy-data";
import { useCartStore } from "@/store/useCartStore";
import styles from "@/styles/store/category.module.css";

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

interface CategoryViewProps {
  currentCategory?: Category;
  initialSearchQuery?: string;
  initialDiscountOnly?: boolean;
}

export function CategoryView({
  currentCategory,
  initialSearchQuery = "",
  initialDiscountOnly = false,
}: CategoryViewProps) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(
    currentCategory ? currentCategory.slug : "all"
  );
  const [minPriceInput, setMinPriceInput] = useState<string>("");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | null>(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | null>(null);

  const [onlyDiscount, setOnlyDiscount] = useState<boolean>(initialDiscountOnly);
  const [minRating, setMinRating] = useState<number | null>(null);

  const [sortBy, setSortBy] = useState<"relevant" | "latest" | "bestseller" | "price-asc" | "price-desc">(
    "relevant"
  );

  const [addedToast, setAddedToast] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent, prod: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: prod.id,
      name: prod.name,
      price: prod.discountPrice ?? prod.price,
      image: prod.images[0],
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const minVal = minPriceInput ? parseInt(minPriceInput.replace(/\D/g, ""), 10) : null;
    const maxVal = maxPriceInput ? parseInt(maxPriceInput.replace(/\D/g, ""), 10) : null;
    setAppliedMinPrice(minVal);
    setAppliedMaxPrice(maxVal);
  };

  const handleResetFilters = () => {
    setMinPriceInput("");
    setMaxPriceInput("");
    setAppliedMinPrice(null);
    setAppliedMaxPrice(null);
    setOnlyDiscount(false);
    setMinRating(null);
    setSortBy("relevant");
  };

  // Active Category details
  const activeCategory = DUMMY_CATEGORIES.find((c) => c.slug === selectedCategorySlug);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...DUMMY_PRODUCTS];

    // Filter by Category
    if (selectedCategorySlug && selectedCategorySlug !== "all") {
      const catObj = DUMMY_CATEGORIES.find((c) => c.slug === selectedCategorySlug);
      if (catObj) {
        list = list.filter((p) => p.category.toLowerCase() === catObj.name.toLowerCase());
      }
    }

    // Filter by Search Query
    if (initialSearchQuery) {
      const q = initialSearchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by Discount
    if (onlyDiscount) {
      list = list.filter((p) => !!p.discountPrice && p.discountPrice < p.price);
    }

    // Filter by Minimum Rating
    if (minRating !== null) {
      list = list.filter((p) => p.rating >= minRating);
    }

    // Filter by Price Range
    if (appliedMinPrice !== null) {
      list = list.filter((p) => (p.discountPrice ?? p.price) >= appliedMinPrice);
    }
    if (appliedMaxPrice !== null) {
      list = list.filter((p) => (p.discountPrice ?? p.price) <= appliedMaxPrice);
    }

    // Sorting
    if (sortBy === "latest") {
      list.reverse();
    } else if (sortBy === "bestseller") {
      list.sort((a, b) => b.soldCount - a.soldCount);
    } else if (sortBy === "price-asc") {
      list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    }

    return list;
  }, [
    selectedCategorySlug,
    initialSearchQuery,
    onlyDiscount,
    minRating,
    appliedMinPrice,
    appliedMaxPrice,
    sortBy,
  ]);

  const activeCategoryTitle = activeCategory
    ? activeCategory.name
    : initialSearchQuery
    ? `Hasil Pencarian: "${initialSearchQuery}"`
    : "Semua Koleksi Produk";

  const activeCategoryDesc = activeCategory
    ? `Koleksi kurasi pakaian dan perlengkapan ${activeCategory.name.toLowerCase()} dengan standar material ramah lingkungan dan kenyamanan harian.`
    : "Jelajahi seluruh varian pakaian santai, alas kaki, serta aksesoris harian terkurasi dari studio MyShop.";

  return (
    <div className={`container mx-auto px-8 ${styles.pageContainer}`}>
      {/* Toast Notification */}
      {addedToast && (
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            background: "#2d5a43",
            color: "#ffffff",
            padding: "14px 22px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(45, 90, 67, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: 600,
            fontSize: "0.92rem",
            zIndex: 999,
          }}
        >
          <Check size={18} /> Berhasil ditambahkan ke keranjang!
        </div>
      )}

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <ChevronRight size={14} />
        <Link href="/products">Katalog</Link>
        {activeCategory && (
          <>
            <ChevronRight size={14} />
            <span className={styles.breadcrumbCurrent}>{activeCategory.name}</span>
          </>
        )}
      </nav>

      {/* Category Hero / Header Banner */}
      <div className={styles.categoryHeader}>
        <div className={styles.headerText}>
          <span className={styles.categoryTag}>
            <Sparkles size={12} style={{ display: "inline", marginRight: 4 }} />
            Katalog Terkurasi
          </span>
          <h1 className={styles.categoryTitle}>{activeCategoryTitle}</h1>
          <p className={styles.categoryDesc}>{activeCategoryDesc}</p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statPill}>
            <span className={styles.statNumber}>{filteredProducts.length}</span>
            <span className={styles.statLabel}>Produk Tampil</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Original</span>
          </div>
        </div>
      </div>

      {/* Quick Category Chips Strip */}
      <div className={styles.quickPillsStrip}>
        <Link
          href="/products"
          onClick={() => setSelectedCategorySlug("all")}
          className={`${styles.quickPill} ${
            selectedCategorySlug === "all" ? styles.quickPillActive : ""
          }`}
        >
          Semua Produk
        </Link>
        {DUMMY_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            onClick={() => setSelectedCategorySlug(cat.slug)}
            className={`${styles.quickPill} ${
              selectedCategorySlug === cat.slug ? styles.quickPillActive : ""
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* 2-Column Catalog Layout: Left Sidebar + Right Products */}
      <div className={styles.catalogLayout}>
        {/* Left Sidebar Filter (Sticky) */}
        <aside className={styles.sidebarFilter}>
          <div className={styles.sidebarHeader}>
            <span className={styles.sidebarTitle}>
              <SlidersHorizontal size={16} /> Filter Produk
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className={styles.resetBtn}
            >
              Reset
            </button>
          </div>

          {/* Filter: Categories */}
          <div className={styles.filterGroup}>
            <h4 className={styles.groupTitle}>Kategori</h4>
            <div className={styles.categoryList}>
              <Link
                href="/products"
                onClick={() => setSelectedCategorySlug("all")}
                className={`${styles.categoryListItem} ${
                  selectedCategorySlug === "all" ? styles.categoryListItemActive : ""
                }`}
              >
                <span>Semua Kategori</span>
                <span className={styles.itemCountBadge}>{DUMMY_PRODUCTS.length}</span>
              </Link>
              {DUMMY_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setSelectedCategorySlug(cat.slug)}
                  className={`${styles.categoryListItem} ${
                    selectedCategorySlug === cat.slug ? styles.categoryListItemActive : ""
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={styles.itemCountBadge}>{cat.itemCount}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Filter: Price Range */}
          <div className={styles.filterGroup}>
            <h4 className={styles.groupTitle}>Rentang Harga</h4>
            <form onSubmit={handleApplyPrice} className={styles.priceInputs}>
              <div className={styles.priceField}>
                <span className={styles.pricePrefix}>Rp</span>
                <input
                  type="text"
                  placeholder="Harga Terendah"
                  value={minPriceInput}
                  onChange={(e) => setMinPriceInput(e.target.value)}
                  className={styles.priceInput}
                />
              </div>
              <div className={styles.priceField}>
                <span className={styles.pricePrefix}>Rp</span>
                <input
                  type="text"
                  placeholder="Harga Tertinggi"
                  value={maxPriceInput}
                  onChange={(e) => setMaxPriceInput(e.target.value)}
                  className={styles.priceInput}
                />
              </div>
              <button type="submit" className={styles.applyPriceBtn}>
                Terapkan Harga
              </button>
            </form>
          </div>

          {/* Filter: Offers & Promos */}
          <div className={styles.filterGroup}>
            <h4 className={styles.groupTitle}>Penawaran & Promo</h4>
            <div className={styles.checkboxList}>
              <label
                className={styles.checkboxLabel}
                onClick={() => setOnlyDiscount(!onlyDiscount)}
              >
                <div
                  className={`${styles.checkboxCustom} ${
                    onlyDiscount ? styles.checkboxChecked : ""
                  }`}
                >
                  {onlyDiscount && <Check size={12} strokeWidth={3} />}
                </div>
                <span>Sedang Diskon</span>
              </label>
            </div>
          </div>

          {/* Filter: Rating */}
          <div className={styles.filterGroup}>
            <h4 className={styles.groupTitle}>Rating Minimal</h4>
            <div className={styles.checkboxList}>
              {[
                { label: "⭐ 4.8 ke atas", val: 4.8 },
                { label: "⭐ 4.5 ke atas", val: 4.5 },
                { label: "⭐ 4.0 ke atas", val: 4.0 },
              ].map((r) => (
                <label
                  key={r.val}
                  className={styles.checkboxLabel}
                  onClick={() => setMinRating(minRating === r.val ? null : r.val)}
                >
                  <div
                    className={`${styles.checkboxCustom} ${
                      minRating === r.val ? styles.checkboxChecked : ""
                    }`}
                  >
                    {minRating === r.val && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Main Products Area */}
        <section className={styles.productsMain}>
          {/* Top Control Bar: Total found & Sort dropdown */}
          <div className={styles.topControlBar}>
            <div className={styles.resultCountText}>
              Menampilkan{" "}
              <span className={styles.resultCountNumber}>{filteredProducts.length}</span> produk
              {selectedCategorySlug !== "all" && activeCategory ? (
                <> untuk kategori <strong>{activeCategory.name}</strong></>
              ) : null}
            </div>

            <div className={styles.sortControls}>
              <span className={styles.sortLabel}>Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={styles.sortSelect}
              >
                <option value="relevant">Paling Sesuai</option>
                <option value="bestseller">Penjualan Terbanyak</option>
                <option value="latest">Terbaru</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <SearchX size={28} />
              </div>
              <h3 className={styles.emptyTitle}>Produk Tidak Ditemukan</h3>
              <p className={styles.emptyDesc}>
                Tidak ada produk yang sesuai dengan kriteria filter harga atau kategori saat ini. Coba ubah atau reset filter.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className={styles.emptyResetBtn}
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            /* Product Cards Grid */
            <div className={styles.productGrid}>
              {filteredProducts.map((prod) => {
                const currentPrice = prod.discountPrice ?? prod.price;
                const hasDiscount = !!prod.discountPrice && prod.discountPrice < prod.price;
                const discountPercent = hasDiscount
                  ? Math.round(((prod.price - prod.discountPrice!) / prod.price) * 100)
                  : 0;

                return (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.slug}`}
                    className={styles.productCard}
                  >
                    <div className={styles.cardImgWrap}>
                      <Image
                        src={prod.images[0]}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className={styles.cardImg}
                      />
                      {prod.badge && (
                        <span className={styles.cardBadge}>{prod.badge}</span>
                      )}
                      {hasDiscount && (
                        <span className={styles.discountBadge}>-{discountPercent}%</span>
                      )}
                    </div>

                    <div className={styles.cardBody}>
                      <span className={styles.cardCategory}>{prod.category}</span>
                      <h3 className={styles.cardTitle}>{prod.name}</h3>

                      <div className={styles.cardPriceRow}>
                        <div>
                          <div className={styles.currentPrice}>{formatRupiah(currentPrice)}</div>
                          {hasDiscount && (
                            <div className={styles.originalPrice}>
                              {formatRupiah(prod.price)}
                            </div>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, prod)}
                          className={styles.cardCartBtn}
                          aria-label="Tambah ke keranjang"
                          title="Tambah ke Keranjang"
                        >
                          <ShoppingBag size={15} />
                        </button>
                      </div>

                      <div className={styles.cardMetaRow}>
                        <div className={styles.ratingBox}>
                          <Star size={13} fill="#d97706" color="#d97706" />
                          <span>{prod.rating}</span>
                        </div>
                        <span>{prod.soldCount} terjual</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

