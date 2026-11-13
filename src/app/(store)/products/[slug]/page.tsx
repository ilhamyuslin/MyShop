"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  ChevronRight,
  ThumbsUp,
  X,
  Check,
  Share2,
} from "lucide-react";
import { DUMMY_PRODUCTS } from "@/lib/dummy-data";
import { useCartStore } from "@/store/useCartStore";
import styles from "@/styles/store/product.detail.module.css";

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = DUMMY_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Interactive Gallery State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Variant States
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );

  // Quantity State
  const [quantity, setQuantity] = useState(1);

  // Active Tab State (0: Deskripsi & Spesifikasi, 1: Panduan Ukuran, 2: Ulasan Pembeli)
  const [activeTab, setActiveTab] = useState(0);

  // Modal Size Guide State
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Review Filter State
  const [reviewFilter, setReviewFilter] = useState<"all" | "photos" | "5star">("all");

  // Cart Store
  const addItem = useCartStore((state) => state.addItem);
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: `${product.name} (${selectedColor ? selectedColor + ", " : ""}${selectedSize})`,
      price: product.discountPrice ?? product.price,
      image: product.images[0],
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const currentPrice = product.discountPrice ?? product.price;
  const subtotal = currentPrice * quantity;
  const hasDiscount = !!product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  // Filtered reviews
  const rawReviews = product.reviews || [];
  const filteredReviews = rawReviews.filter((r) => {
    if (reviewFilter === "photos") return !!r.images && r.images.length > 0;
    if (reviewFilter === "5star") return r.rating === 5;
    return true;
  });

  // Related products
  const relatedProducts = DUMMY_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

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
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <Check size={18} /> Berhasil ditambahkan ke keranjang!
        </div>
      )}

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <ChevronRight size={14} />
        <Link href={`/category/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* 3-Column Product Grid */}
      <div className={styles.productGrid}>
        {/* Left Column: Gallery */}
        <div className={styles.galleryCol}>
          <div className={styles.mainImageWrapper}>
            {product.badge && <span className={styles.galleryBadge}>{product.badge}</span>}
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 460px"
              className={styles.mainImage}
            />
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className={styles.thumbnailStrip}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`${styles.thumbnailBtn} ${
                    selectedImageIndex === idx ? styles.thumbnailBtnActive : ""
                  }`}
                  aria-label={`Lihat gambar ke-${idx + 1}`}
                >
                  <Image src={img} alt="" fill sizes="72px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center Column: Product Information & Variant Selector */}
        <div className={styles.infoCol}>
          <span className={styles.categoryTag}>{product.category}</span>
          <h1 className={styles.productTitle}>{product.name}</h1>

          {/* Meta ratings & sold counts */}
          <div className={styles.metaStats}>
            <div className={styles.ratingBox}>
              <Star size={16} fill="#d97706" color="#d97706" />
              <span>{product.rating}</span>
            </div>
            <span className={styles.metaDot} />
            <button
              onClick={() => setActiveTab(2)}
              style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0 }}
            >
              {product.reviewCount} Ulasan
            </button>
            <span className={styles.metaDot} />
            <span>{product.soldCount} Terjual</span>
          </div>

          {/* Price Block */}
          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>{formatRupiah(currentPrice)}</span>
            {hasDiscount && (
              <>
                <span className={styles.originalPrice}>{formatRupiah(product.price)}</span>
                <span className={styles.discountBadge}>Hemat {discountPercent}%</span>
              </>
            )}
          </div>

          {/* Variant Selectors */}
          <div className={styles.variantSection}>
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className={styles.variantLabel}>
                  <span>Pilih Warna:</span>
                  <span className={styles.selectedVariantText}>{selectedColor}</span>
                </div>
                <div className={styles.colorList}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`${styles.colorBtn} ${
                        selectedColor === c.name ? styles.colorBtnActive : ""
                      }`}
                    >
                      <span className={styles.colorDot} style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className={styles.variantLabel}>
                  <span>Pilih Ukuran:</span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className={styles.sizeGuideLink}
                  >
                    Panduan Ukuran
                  </button>
                </div>
                <div className={styles.sizeList}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`${styles.sizeBtn} ${
                        selectedSize === s ? styles.sizeBtnActive : ""
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Brand Assurance Badges */}
          <div className={styles.assuranceGrid}>
            <div className={styles.assuranceItem}>
              <Truck size={18} className={styles.assuranceIcon} />
              <span>Bebas Ongkir s/d 40rb</span>
            </div>
            <div className={styles.assuranceItem}>
              <ShieldCheck size={18} className={styles.assuranceIcon} />
              <span>100% Produk Original</span>
            </div>
            <div className={styles.assuranceItem}>
              <RotateCcw size={18} className={styles.assuranceIcon} />
              <span>Garansi Tukar 7 Hari</span>
            </div>
            <div className={styles.assuranceItem}>
              <Sparkles size={18} className={styles.assuranceIcon} />
              <span>Material Premium Pilihan</span>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Checkout Card */}
        <div className={styles.checkoutCol}>
          <div className={styles.checkoutCard}>
            <h3 className={styles.checkoutHeader}>Atur Jumlah & Pesan</h3>

            {/* Selected item preview */}
            <div className={styles.selectedSummary}>
              <div style={{ position: "relative", width: 48, height: 48 }}>
                <Image
                  src={product.images[0]}
                  alt=""
                  fill
                  sizes="48px"
                  className={styles.selectedMiniThumb}
                />
              </div>
              <div className={styles.selectedDetails}>
                <span className={styles.selectedName}>{product.name}</span>
                <span className={styles.selectedVariantBadge}>
                  {selectedColor ? selectedColor : ""}
                  {selectedColor && selectedSize ? ", " : ""}
                  {selectedSize ? `Size ${selectedSize}` : ""}
                </span>
              </div>
            </div>

            {/* Quantity Controller */}
            <div className={styles.quantityRow}>
              <span className={styles.quantityLabel}>Kuantitas</span>
              <div className={styles.quantityControl}>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Kurangi kuantitas"
                >
                  <Minus size={14} />
                </button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button
                  type="button"
                  className={styles.qtyBtn}
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  aria-label="Tambah kuantitas"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Stock indicator */}
            <div className={styles.stockHint}>
              <span>Sisa Stok:</span>
              <span className={product.stock < 10 ? styles.stockLow : ""}>
                {product.stock} tersisa
              </span>
            </div>

            {/* Subtotal */}
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalAmount}>{formatRupiah(subtotal)}</span>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionBtns}>
              <button
                type="button"
                className={styles.btnAddToCart}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>+ Keranjang</span>
              </button>
              <Link
                href="/cart"
                onClick={handleAddToCart}
                className={styles.btnBuyNow}
              >
                Beli Langsung
              </Link>
            </div>

            <div className={styles.cardFooterTrust}>
              <ShieldCheck size={14} color="#2d5a43" />
              <span>Transaksi aman & terjamin garansi toko</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Deskripsi, Panduan Ukuran, Ulasan Pembeli */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabNav}>
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`${styles.tabBtn} ${activeTab === 0 ? styles.tabBtnActive : ""}`}
          >
            Deskripsi & Spesifikasi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`${styles.tabBtn} ${activeTab === 1 ? styles.tabBtnActive : ""}`}
          >
            Panduan Ukuran
          </button>
          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className={`${styles.tabBtn} ${activeTab === 2 ? styles.tabBtnActive : ""}`}
          >
            Ulasan Pembeli ({product.reviewCount})
          </button>
        </div>

        {/* Tab 0: Deskripsi & Spesifikasi */}
        {activeTab === 0 && (
          <div>
            <p className={styles.descContent}>{product.description}</p>
            {product.specifications && (
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "14px", color: "#1e293b" }}>
                  Spesifikasi Detail Produk
                </h4>
                <table className={styles.specsTable}>
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i}>
                        <td className={styles.specsLabel}>{spec.label}</td>
                        <td className={styles.specsValue}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 1: Panduan Ukuran */}
        {activeTab === 1 && (
          <div className={styles.sizeGuideContent}>
            <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "8px" }}>
              Toleransi ukuran 1-2 cm wajar karena proses pemotongan manual dan sifat serat bahan alami.
            </p>
            <table className={styles.sizeGuideTable}>
              <thead>
                <tr>
                  <th>Ukuran</th>
                  <th>Lebar Dada (cm)</th>
                  <th>Panjang Baju (cm)</th>
                  <th>Panjang Lengan (cm)</th>
                  <th>Rekomendasi Berat (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>S</strong></td>
                  <td>52</td>
                  <td>68</td>
                  <td>22</td>
                  <td>50 - 60 kg</td>
                </tr>
                <tr>
                  <td><strong>M</strong></td>
                  <td>55</td>
                  <td>71</td>
                  <td>23</td>
                  <td>60 - 70 kg</td>
                </tr>
                <tr>
                  <td><strong>L</strong></td>
                  <td>58</td>
                  <td>73</td>
                  <td>24</td>
                  <td>70 - 80 kg</td>
                </tr>
                <tr>
                  <td><strong>XL</strong></td>
                  <td>61</td>
                  <td>75</td>
                  <td>25</td>
                  <td>80 - 90 kg</td>
                </tr>
                <tr>
                  <td><strong>XXL</strong></td>
                  <td>64</td>
                  <td>77</td>
                  <td>26</td>
                  <td>90 - 100 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Ulasan Pembeli */}
        {activeTab === 2 && (
          <div>
            {/* Overview Star Breakdown */}
            <div className={styles.reviewsOverview}>
              <div className={styles.scoreBox}>
                <div className={styles.bigScore}>
                  {product.rating} <span className={styles.bigScoreSpan}>/ 5.0</span>
                </div>
                <div className={styles.starRatingRow}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span className={styles.totalReviewsCount}>
                  Berdasarkan {product.reviewCount} ulasan pembeli
                </span>
              </div>

              {/* Progress bars */}
              <div className={styles.barsBox}>
                <div className={styles.barRow}>
                  <span style={{ width: 60 }}>Bintang 5</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: "88%" }} />
                  </div>
                  <span style={{ width: 36, textAlign: "right" }}>88%</span>
                </div>
                <div className={styles.barRow}>
                  <span style={{ width: 60 }}>Bintang 4</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: "10%" }} />
                  </div>
                  <span style={{ width: 36, textAlign: "right" }}>10%</span>
                </div>
                <div className={styles.barRow}>
                  <span style={{ width: 60 }}>Bintang 3</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: "2%" }} />
                  </div>
                  <span style={{ width: 36, textAlign: "right" }}>2%</span>
                </div>
                <div className={styles.barRow}>
                  <span style={{ width: 60 }}>Bintang 2</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: "0%" }} />
                  </div>
                  <span style={{ width: 36, textAlign: "right" }}>0%</span>
                </div>
                <div className={styles.barRow}>
                  <span style={{ width: 60 }}>Bintang 1</span>
                  <div className={styles.barTrack}>
                    <div className={styles.barFill} style={{ width: "0%" }} />
                  </div>
                  <span style={{ width: 36, textAlign: "right" }}>0%</span>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className={styles.reviewFilterChips}>
              <button
                type="button"
                onClick={() => setReviewFilter("all")}
                className={`${styles.filterChip} ${
                  reviewFilter === "all" ? styles.filterChipActive : ""
                }`}
              >
                Semua Ulasan
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("photos")}
                className={`${styles.filterChip} ${
                  reviewFilter === "photos" ? styles.filterChipActive : ""
                }`}
              >
                Dengan Foto / Media
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("5star")}
                className={`${styles.filterChip} ${
                  reviewFilter === "5star" ? styles.filterChipActive : ""
                }`}
              >
                Bintang 5 Saja
              </button>
            </div>

            {/* Review Cards List */}
            <div className={styles.reviewList}>
              {filteredReviews.length === 0 ? (
                <p style={{ color: "#64748b", padding: "20px 0" }}>Tidak ada ulasan pada filter ini.</p>
              ) : (
                filteredReviews.map((rev) => (
                  <div key={rev.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewerMeta}>
                        <span className={styles.reviewerName}>{rev.author}</span>
                        <span className={styles.reviewDate}>{rev.date}</span>
                      </div>
                      <div className={styles.reviewStars}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>

                    <div className={styles.reviewVariantTag}>Varian: {rev.variant}</div>
                    <p className={styles.reviewComment}>{rev.comment}</p>

                    {/* Review Images */}
                    {rev.images && rev.images.length > 0 && (
                      <div className={styles.reviewImages}>
                        {rev.images.map((imgUrl, i) => (
                          <div
                            key={i}
                            style={{ position: "relative", width: 72, height: 72, borderRadius: 8, overflow: "hidden" }}
                          >
                            <Image src={imgUrl} alt="Ulasan pembeli" fill sizes="72px" className={styles.reviewImg} />
                          </div>
                        ))}
                      </div>
                    )}

                    <button type="button" className={styles.helpfulBtn}>
                      <ThumbsUp size={14} />
                      <span>Membantu ({rev.helpfulCount})</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products / Rekomendasi */}
      <div className={styles.relatedSection}>
        <div className={styles.relatedHeader}>
          <div>
            <h3 className={styles.relatedTitle}>Produk Serupa Lainnya</h3>
            <p className={styles.relatedSubtitle}>
              Pilihan favorit pelanggan lain yang mungkin cocok dengan gayamu
            </p>
          </div>
          <Link
            href="/category/fashion-casual"
            style={{
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "#2d5a43",
              textDecoration: "none",
            }}
          >
            Lihat Semua →
          </Link>
        </div>

        <div className={styles.relatedGrid}>
          {relatedProducts.map((rel) => {
            const relPrice = rel.discountPrice ?? rel.price;
            return (
              <Link
                key={rel.id}
                href={`/products/${rel.slug}`}
                className={styles.relatedCard}
              >
                <div className={styles.relatedCardImgWrapper}>
                  <Image
                    src={rel.images[0]}
                    alt={rel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className={styles.relatedCardImg}
                  />
                </div>
                <div className={styles.relatedCardBody}>
                  <span className={styles.relatedCardCategory}>{rel.category}</span>
                  <h4 className={styles.relatedCardTitle}>{rel.name}</h4>
                  <div className={styles.relatedCardPriceRow}>
                    <span className={styles.relatedCardPrice}>{formatRupiah(relPrice)}</span>
                    {rel.discountPrice && (
                      <span className={styles.relatedCardOriginalPrice}>
                        {formatRupiah(rel.price)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Modal Size Guide */}
      {isSizeGuideOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsSizeGuideOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setIsSizeGuideOpen(false)}
              aria-label="Tutup panduan ukuran"
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px", color: "#1e293b" }}>
              Panduan Ukuran Pakaian
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "20px" }}>
              Ukur tubuh dengan pita meteran dalam posisi tegak dan santai.
            </p>
            <table className={styles.sizeGuideTable}>
              <thead>
                <tr>
                  <th>Ukuran</th>
                  <th>Lebar Dada</th>
                  <th>Panjang Baju</th>
                  <th>Panjang Lengan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>S</strong></td>
                  <td>52 cm</td>
                  <td>68 cm</td>
                  <td>22 cm</td>
                </tr>
                <tr>
                  <td><strong>M</strong></td>
                  <td>55 cm</td>
                  <td>71 cm</td>
                  <td>23 cm</td>
                </tr>
                <tr>
                  <td><strong>L</strong></td>
                  <td>58 cm</td>
                  <td>73 cm</td>
                  <td>24 cm</td>
                </tr>
                <tr>
                  <td><strong>XL</strong></td>
                  <td>61 cm</td>
                  <td>75 cm</td>
                  <td>25 cm</td>
                </tr>
                <tr>
                  <td><strong>XXL</strong></td>
                  <td>64 cm</td>
                  <td>77 cm</td>
                  <td>26 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

