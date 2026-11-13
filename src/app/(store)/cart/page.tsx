"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  ShieldCheck,
  Truck,
  ArrowRight,
  Check,
  Tag,
  X,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { DUMMY_PRODUCTS } from "@/lib/dummy-data";
import styles from "@/styles/store/cart.module.css";

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  // Selected item IDs for checkout (seperti Tokopedia/Shopee: bisa pilih sebagian)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Promo code state
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync selectedIds with cart items on mount & update
  useEffect(() => {
    if (mounted) {
      // Default: semua item yang ada di cart tercentang
      setSelectedIds((prev) => {
        const itemIds = items.map((i) => i.id);
        const validSelected = prev.filter((id) => itemIds.includes(id));
        // Jika sebelumnya belum ada yang dipilih dan ada item, pilih semua
        if (validSelected.length === 0 && items.length > 0) {
          return itemIds;
        }
        return validSelected;
      });
    }
  }, [items, mounted]);

  if (!mounted) {
    return (
      <div className="container mx-auto px-8 py-20 text-center text-slate-400">
        Memuat keranjang belanja...
      </div>
    );
  }

  // Toggle selection
  const handleToggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  };

  const handleToggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => removeItem(id));
    setSelectedIds([]);
  };

  // Promo Code Validation
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const codeClean = promoCode.trim().toUpperCase();

    if (!codeClean) return;

    if (codeClean === "MYSHOP20" || codeClean === "DISKON20") {
      setAppliedPromo({ code: codeClean, discount: 20000 });
      setPromoCode("");
    } else if (codeClean === "ONGKIRGRATIS") {
      setAppliedPromo({ code: codeClean, discount: 15000 });
      setPromoCode("");
    } else {
      setPromoError("Kode kupon tidak valid atau sudah kedaluwarsa.");
    }
  };

  const handleCancelPromo = () => {
    setAppliedPromo(null);
  };

  // Perhitungan Subtotal hanya untuk item yang dicentang
  const selectedItems = items.filter((item) => selectedIds.includes(item.id));
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.min(appliedPromo.discount, subtotal) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  // Rekomendasi produk di bawah keranjang
  const recommendedProducts = DUMMY_PRODUCTS.slice(0, 4);

  return (
    <div className={`container mx-auto px-8 ${styles.pageContainer}`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <ChevronRight size={14} />
        <span className={styles.breadcrumbCurrent}>Keranjang Belanja</span>
      </nav>

      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Keranjang Belanja</h1>
        <span className={styles.itemCountBadge}>({items.length} Barang)</span>
      </div>

      {items.length === 0 ? (
        /* Empty State */
        <div className={styles.emptyCartState}>
          <div className={styles.emptyCartIcon}>
            <ShoppingBag size={36} />
          </div>
          <h2 className={styles.emptyCartTitle}>Wah, keranjang belanjamu kosong!</h2>
          <p className={styles.emptyCartDesc}>
            Yuk, cari pakaian kasual santai, alas kaki, dan aksesoris impianmu dan masukkan ke dalam keranjang.
          </p>
          <Link href="/products" className={styles.shopNowBtn}>
            <span>Mulai Belanja Sekarang</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        /* 2-Column Cart Layout */
        <div className={styles.cartGrid}>
          {/* Left Column: Items List */}
          <div className={styles.cartItemsCol}>
            {/* Table Header Action Bar (Pilih Semua & Hapus) */}
            <div className={styles.tableHeaderBar}>
              <label className={styles.checkboxLabel} onClick={handleToggleSelectAll}>
                <div
                  className={`${styles.customCheckbox} ${
                    selectedIds.length === items.length && items.length > 0
                      ? styles.checkboxChecked
                      : ""
                  }`}
                >
                  {selectedIds.length === items.length && items.length > 0 && (
                    <Check size={14} strokeWidth={3} />
                  )}
                </div>
                <span>
                  Pilih Semua ({selectedIds.length}/{items.length})
                </span>
              </label>

              {selectedIds.length > 0 && (
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  className={styles.deleteSelectedBtn}
                >
                  <Trash2 size={15} />
                  <span>Hapus Terpilih</span>
                </button>
              )}
            </div>

            {/* List of Cart Cards */}
            {items.map((item) => {
              const isSelected = selectedIds.includes(item.id);

              return (
                <div key={item.id} className={styles.cartCard}>
                  {/* Item Checkbox */}
                  <label
                    className={styles.checkboxLabel}
                    onClick={() => handleToggleItem(item.id)}
                  >
                    <div
                      className={`${styles.customCheckbox} ${
                        isSelected ? styles.checkboxChecked : ""
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                  </label>

                  {/* Thumbnail */}
                  <div className={styles.itemThumbWrapper}>
                    <Image
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80"
                      }
                      alt={item.name}
                      fill
                      sizes="88px"
                      className={styles.itemThumb}
                    />
                  </div>

                  {/* Item Info */}
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <span className={styles.itemPrice}>{formatRupiah(item.price)}</span>
                  </div>

                  {/* Qty & Remove */}
                  <div className={styles.itemActionCol}>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className={styles.removeSingleBtn}
                      aria-label="Hapus produk"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className={styles.quantityControl}>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Kurangi jumlah"
                      >
                        <Minus size={13} />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Tambah jumlah"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Summary Box */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryHeader}>Ringkasan Belanja</h2>

              {/* Promo Coupon Form */}
              <div>
                {appliedPromo ? (
                  <div className={styles.couponApplied}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Tag size={15} />
                      <span>Kupon &apos;{appliedPromo.code}&apos; Aktif</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCancelPromo}
                      className={styles.couponCancelBtn}
                      title="Batalkan kupon"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className={styles.couponBox}>
                    <input
                      type="text"
                      placeholder="Masukkan kode promo (contoh: MYSHOP20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={styles.couponInput}
                    />
                    <button type="submit" className={styles.couponBtn}>
                      Gunakan
                    </button>
                  </form>
                )}
                {promoError && (
                  <p style={{ fontSize: "0.75rem", color: "#ef4444", marginTop: 4 }}>
                    {promoError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className={styles.summaryRow}>
                <span>Total Harga ({selectedItems.reduce((a, b) => a + b.quantity, 0)} barang)</span>
                <span className={styles.summaryRowValue}>{formatRupiah(subtotal)}</span>
              </div>

              {appliedPromo && (
                <div className={styles.summaryRow}>
                  <span>Diskon Kupon</span>
                  <span className={styles.discountValue}>-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className={styles.summaryRow}>
                <span>Estimasi Pengiriman</span>
                <span style={{ color: "#10b981", fontWeight: 700 }}>Gratis Ongkir</span>
              </div>

              <div className={styles.totalDivider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total Tagihan</span>
                <span className={styles.totalAmount}>{formatRupiah(grandTotal)}</span>
              </div>

              {/* Action Button */}
              <Link
                href="/checkout"
                className={`${styles.checkoutBtn} ${
                  selectedItems.length === 0 ? styles.checkoutBtnDisabled : ""
                }`}
              >
                <span>Beli Sekarang ({selectedItems.length})</span>
                <ArrowRight size={16} />
              </Link>

              {/* Guarantees */}
              <div className={styles.summaryPerks}>
                <div className={styles.perkItem}>
                  <Truck size={16} className={styles.perkIcon} />
                  <span>Bebas ongkir pengiriman seluruh Indonesia</span>
                </div>
                <div className={styles.perkItem}>
                  <ShieldCheck size={16} className={styles.perkIcon} />
                  <span>Jaminan 100% Produk Original & Terpercaya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Products Carousel / Grid */}
      <section className={styles.recommendedSection}>
        <div className={styles.recommendedHeader}>
          <h3 className={styles.recommendedTitle}>Rekomendasi Spesial Buat Kamu</h3>
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: 2 }}>
            Pilihan populer yang sering dipesan bersamaan
          </p>
        </div>

        <div className={styles.recommendedGrid}>
          {recommendedProducts.map((prod) => (
            <Link
              key={prod.id}
              href={`/products/${prod.slug}`}
              style={{
                background: "#ffffff",
                border: "1px solid #edf0ec",
                borderRadius: 14,
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
                <Image
                  src={prod.images[0]}
                  alt={prod.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", flex: 1 }}>
                <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>
                  {prod.category}
                </span>
                <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1e293b", margin: "4px 0 8px", lineHeight: 1.3 }}>
                  {prod.name}
                </h4>
                <div style={{ marginTop: "auto", display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: "0.98rem", fontWeight: 800, color: "#2d5a43" }}>
                    {formatRupiah(prod.discountPrice ?? prod.price)}
                  </span>
                  {prod.discountPrice && (
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8", textDecoration: "line-through" }}>
                      {formatRupiah(prod.price)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

