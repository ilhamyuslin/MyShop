"use client";

import React from "react";
import {
  MapPin,
  ChevronDown,
  Truck,
  Leaf,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS } from "@/lib/dummy-data";
import { HeroBannerCarousel, BannerSlide } from "./hero/HeroBannerCarousel";
import { FlashSaleWidget } from "./flash-sale/FlashSaleWidget";
import { CuratedStageShowcase } from "./showcase/CuratedStageShowcase";
import { CategoryScrollStrip } from "./catalog/CategoryScrollStrip";
import { CompactProductGrid } from "./catalog/CompactProductGrid";
import styles from "@/styles/store/home.desktop.module.css";

const BANNER_SLIDES: BannerSlide[] = [
  {
    id: 1,
    tag: "Super Brand Day",
    title: "Kemeja Linen & Celana Santai Musim Ini",
    desc: "Sentuhan bahan linen adem 100% serat alami. Potongan casual untuk kenyamanan aktivitas harian.",
    btnText: "Beli Sekarang",
    btnLink: "/products/linen-relaxed-casual-shirt",
    bgImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    tag: "Flash Weekend",
    title: "Minimalist Retro Canvas Sneakers",
    desc: "Insole memory foam empuk, tahan seharian. Cocok dipadukan dengan gaya formal maupun santai.",
    btnText: "Lihat Promo",
    btnLink: "/products/retro-minimalist-canvas-sneakers",
    bgImage: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    tag: "Garansi Resmi 1 Tahun",
    title: "Studio Sound Wireless ANC Headphones",
    desc: "Heningkan suara sekitar dengan Active Noise Cancellation cerdas dan baterai 40 jam.",
    btnText: "Eksplorasi Audio",
    btnLink: "/products/wireless-anc-over-ear-headphones",
    bgImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    tag: "Aksesoris Eksklusif",
    title: "Tas Selempang & Ransel Ringan Anti-Air",
    desc: "Material Cordura water-repellent dengan kompartemen laptop dan tablet yang terorganisir rapi.",
    btnText: "Cek Koleksi Tas",
    btnLink: "/products/urban-waterproof-sling-bag",
    bgImage: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    tag: "Daily Lifestyle",
    title: "Tumbler Keramik & Kebutuhan Meja Kerja",
    desc: "Isolasi vakum ganda menjaga suhu kopi hangat hingga 12 jam tanpa mengubah cita rasa murni.",
    btnText: "Beli Perlengkapan",
    btnLink: "/products/ceramic-insulated-travel-tumbler",
    bgImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=80",
  },
];

export function HomeDesktop() {
  return (
    <div className="container mx-auto px-8 pb-20">
      <section className={styles.heroContainer}>
        {/* Top Info Bar (Location & Promo status) */}
        <div className={styles.deliveryBar}>
          <div className={styles.locationPicker}>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Dikirim ke:</span>
            <span className={styles.locationHighlight}>Jakarta Selatan, DKI Jakarta</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
          <span className={styles.promoBadge}>
            <Truck className="w-3.5 h-3.5" /> Bebas Ongkir s/d Rp 40.000 dengan min. transaksi Rp 50.000
          </span>
        </div>

        {/* 70/30 Split Hero Banner Grid */}
        <div className={styles.bannerGrid}>
          {/* 1. Komponen Mandiri: Hero Banner Carousel */}
          <HeroBannerCarousel slides={BANNER_SLIDES} />

          {/* 2. Komponen Mandiri: Flash Sale 2-Card Slider Widget */}
          <FlashSaleWidget products={DUMMY_PRODUCTS} />
        </div>

        {/* Minimalist Brand Trust Strip */}
        <div className={styles.trustBar}>
          <div className={styles.trustItem}>
            <Leaf className={styles.trustIcon} />
            <div>
              <h4 className={styles.trustTitle}>Serat Alami & Ramah</h4>
              <p className={styles.trustDesc}>Material adem pilihan untuk kenyamanan harian</p>
            </div>
          </div>
          <span className={styles.trustDivider} />
          <div className={styles.trustItem}>
            <Truck className={styles.trustIcon} />
            <div>
              <h4 className={styles.trustTitle}>Bebas Ongkir Seluruh Indonesia</h4>
              <p className={styles.trustDesc}>Min. belanja 50rb aman sampai tujuan</p>
            </div>
          </div>
          <span className={styles.trustDivider} />
          <div className={styles.trustItem}>
            <RotateCcw className={styles.trustIcon} />
            <div>
              <h4 className={styles.trustTitle}>Garansi Tukar 7 Hari</h4>
              <p className={styles.trustDesc}>Salah ukuran? Tukar mudah tanpa ribet</p>
            </div>
          </div>
          <span className={styles.trustDivider} />
          <div className={styles.trustItem}>
            <ShieldCheck className={styles.trustIcon} />
            <div>
              <h4 className={styles.trustTitle}>100% Produk Original</h4>
              <p className={styles.trustDesc}>Kualitas terkurasi langsung dari studio kami</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Komponen Mandiri: Kategori Pilihan (Bisa di-Slide) */}
      <CategoryScrollStrip categories={DUMMY_CATEGORIES} />

      {/* 4. Komponen Mandiri: Koleksi Pilihan Center-Stage 3D Showcase */}
      <CuratedStageShowcase products={DUMMY_PRODUCTS} />

      {/* 5. Komponen Mandiri: Jelajahi Semua Produk - Compact Grid Catalog */}
      <CompactProductGrid products={DUMMY_PRODUCTS} />
    </div>
  );
}
