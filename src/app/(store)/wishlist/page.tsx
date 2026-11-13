"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { formatRupiah } from "@/lib/utils";
import { DUMMY_PRODUCTS } from "@/lib/dummy-data";
import styles from "@/styles/store/wishlist.module.css";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const items = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    setMounted(true);
    // Seed sample wishlist if empty for first time impression
    if (useWishlistStore.getState().items.length === 0) {
      addToWishlist(DUMMY_PRODUCTS[0]);
      addToWishlist(DUMMY_PRODUCTS[2]);
    }
  }, [addToWishlist]);

  if (!mounted) {
    return (
      <div className={styles.wishlistWrapper}>
        <div className="container mx-auto px-8" />
      </div>
    );
  }

  return (
    <div className={styles.wishlistWrapper}>
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className={styles.headerSection}>
          <div className={styles.pageTitle}>
            <span>Wishlist Saya</span>
            <span className={styles.itemCountBadge}>{items.length} Barang</span>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              className={styles.clearBtn}
            >
              <Trash2 size={15} />
              <span>Hapus Semua</span>
            </button>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <Heart size={32} />
            </div>
            <h2 className={styles.emptyTitle}>Wishlist Masih Kosong</h2>
            <p className={styles.emptySubtitle}>
              Belum ada produk impian yang kamu simpan. Yuk jelajahi katalog dan klik ikon hati pada produk favoritmu!
            </p>
            <Link href="/products" className={styles.exploreBtn}>
              <span>Mulai Belanja</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className={styles.productGrid}>
            {items.map((product) => {
              const originalPrice = product.discountPrice ? product.price : undefined;
              const displayPrice = product.discountPrice ? product.discountPrice : product.price;
              const hasDiscount = !!originalPrice && originalPrice > displayPrice;
              const discountPercent = hasDiscount
                ? Math.round(((originalPrice - displayPrice) / originalPrice) * 100)
                : 0;

              return (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={product.images[0] || "/placeholder.jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className={styles.productImage}
                    />

                    {hasDiscount && (
                      <span className={styles.discountBadge}>{discountPercent}% OFF</span>
                    )}

                    <button
                      type="button"
                      className={styles.removeWishlistBtn}
                      onClick={() => removeFromWishlist(product.id)}
                      title="Hapus dari wishlist"
                    >
                      <Heart size={16} fill="#c85a32" />
                    </button>
                  </div>

                  <div className={styles.cardBody}>
                    <Link
                      href={`/products/${product.slug}`}
                      className={styles.productTitle}
                    >
                      {product.name}
                    </Link>

                    <div className={styles.priceWrapper}>
                      <span className={styles.finalPrice}>
                        {formatRupiah(displayPrice)}
                      </span>
                      {hasDiscount && (
                        <span className={styles.originalPrice}>
                          {formatRupiah(originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className={styles.addToCartBtn}
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0]
                        });
                        alert(`"${product.name}" berhasil dimasukkan ke keranjang!`);
                      }}
                    >
                      <ShoppingBag size={14} />
                      <span>+ Keranjang</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
