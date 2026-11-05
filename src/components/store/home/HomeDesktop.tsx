"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
  MapPin,
  ChevronDown,
  ArrowRight,
  Zap,
  Tag,
  Truck,
  ShieldCheck,
  Star,
  Gift,
  Shirt,
  Footprints,
  Headphones,
  MessageCircleQuestion,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { DUMMY_CATEGORIES, DUMMY_PRODUCTS, Product } from "@/lib/dummy-data";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import styles from "@/styles/store/home.desktop.module.css";

const BANNER_SLIDES = [
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
    bgImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    tag: "Daily Lifestyle",
    title: "Tumbler Keramik & Kebutuhan Meja Kerja",
    desc: "Isolasi vakum ganda menjaga suhu kopi hangat hingga 12 jam tanpa mengubah cita rasa murni.",
    btnText: "Beli Perlengkapan",
    btnLink: "/products/ceramic-insulated-travel-tumbler",
    bgImage: "https://images.unsplash.com/photo-1517254793699-28c11bb37d36?auto=format&fit=crop&w=1400&q=80",
  },
];

// Flat Minimalist Monochrome Shortcut Features
const FLAT_SHORTCUTS = [
  { label: "Flash Sale", href: "/products?filter=flash-sale", icon: Zap },
  { label: "Semua Promo", href: "/products?filter=promo", icon: Tag },
  { label: "Gratis Ongkir", href: "/products?filter=free-shipping", icon: Truck },
  { label: "Mall 100% Ori", href: "/products?filter=mall", icon: ShieldCheck },
  { label: "Produk Terlaris", href: "/products?filter=best-seller", icon: Star },
  { label: "Voucher Toko", href: "/help", icon: Gift },
  { label: "Fashion Pria/Wanita", href: "/products?category=Fashion%20Casual", icon: Shirt },
  { label: "Sepatu & Kicks", href: "/products?category=Footwear%20%26%20Sneakers", icon: Footprints },
  { label: "Gadget & Audio", href: "/products?category=Audio%20%26%20Gadgets", icon: Headphones },
  { label: "Pusat Bantuan", href: "/help", icon: MessageCircleQuestion },
];

export function HomeDesktop() {
  const addItem = useCartStore((state) => state.addItem);
  const [currentSlide, setCurrentSlide] = useState(0);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Inisialisasi Embla Carousel (dukungan drag/touch swipe native yang sangat mulus)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Auto-slide tiap 5 detik
    const timer = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(timer);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const goToSlide = (idx: number) => {
    if (emblaApi) emblaApi.scrollTo(idx);
  };

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === "left" ? -460 : 460;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
          {/* Main Carousel Slider with Embla (Drag & Swipe Native) */}
          <div className={styles.carouselBox} ref={emblaRef}>
            <div className={styles.carouselTrack}>
              {BANNER_SLIDES.map((slide) => (
                <div
                  key={slide.id}
                  className={styles.carouselSlide}
                  style={{ backgroundImage: `url('${slide.bgImage}')` }}
                >
                  <div className={styles.carouselOverlay} />
                  <div className={styles.carouselContent}>
                    <span className={styles.carouselTag}>{slide.tag}</span>
                    <h2 className={styles.carouselTitle}>{slide.title}</h2>
                    <p className={styles.carouselDesc}>{slide.desc}</p>
                    <Link href={slide.btnLink} className={styles.carouselBtn}>
                      {slide.btnText} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle Minimalist Indicator Lines */}
            <div className={styles.carouselControls}>
              <div className={styles.carouselIndicators}>
                {BANNER_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`${styles.dot} ${idx === currentSlide ? styles.dotActive : ""}`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Banners (Shopee Mall / Promo Right Stack 30%) */}
          <div className={styles.sideBannerStack}>
            <Link
              href="/products?filter=mall"
              className={styles.sideBanner}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbfbf9]/95 via-[#fbfbf9]/80 to-transparent pointer-events-none" />
              <div className={styles.sideBannerContent}>
                <span className={styles.sideBannerTag}>MyShop Mall</span>
                <h3 className={styles.sideBannerTitle}>100% Produk Original & Terkurasi</h3>
              </div>
              <span className={`${styles.sideBannerLink} z-10`}>
                Lihat Brand <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              href="/products?filter=flash-sale"
              className={styles.sideBanner}
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517254793699-28c11bb37d36?auto=format&fit=crop&w=600&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbfbf9]/95 via-[#fbfbf9]/80 to-transparent pointer-events-none" />
              <div className={styles.sideBannerContent}>
                <span className={styles.sideBannerTag}>Flash Sale Weekend</span>
                <h3 className={styles.sideBannerTitle}>Diskon Kilat Hingga 50%</h3>
              </div>
              <span className={`${styles.sideBannerLink} z-10`}>
                Klaim Voucher <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>

        {/* 10 Shortcut Icons Bar (Monochrome Flat Vector Icons) */}
        <div className={styles.shortcutBar}>
          <div className={styles.shortcutGrid}>
            {FLAT_SHORTCUTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link key={idx} href={item.href} className={styles.shortcutItem}>
                  <div className={styles.shortcutIconWrapper}>
                    <Icon className="w-5 h-5 stroke-[1.6]" />
                  </div>
                  <span className={styles.shortcutLabel}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kategori Pilihan (Bisa di-Slide) */}
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
            {DUMMY_CATEGORIES.map((cat) => (
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

      {/* Produk Rekomendasi Terpopuler */}
      <section className="mt-12">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Rekomendasi Terpopuler</h2>
          <Link href="/products" className={styles.sectionLink}>
            Lihat Katalog Lengkap <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className={styles.productGrid}>
          {DUMMY_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className={styles.productCard}
            >
              <div className={styles.imageContainer}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={styles.image}
                  loading="lazy"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-white/95 text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs border border-slate-200/60">
                    {product.badge}
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className={styles.quickAddBtn}
                  title="Tambah ke Keranjang"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    {product.category}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 hover:text-blue-600 transition">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    {product.discountPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-blue-600">
                          {formatRupiah(product.discountPrice)}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {formatRupiah(product.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-base font-extrabold text-slate-900">
                        {formatRupiah(product.price)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-medium text-slate-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[11px] text-slate-400">{product.soldCount} terjual</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
