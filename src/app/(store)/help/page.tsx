"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  Truck,
  RotateCcw,
  CreditCard,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Mail,
  Clock,
  ShieldCheck,
} from "lucide-react";
import styles from "@/styles/store/help.module.css";

interface FAQItem {
  id: string;
  category: "shipping" | "exchange" | "payment" | "order";
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-1",
    category: "exchange",
    question: "Bagaimana cara melakukan penukaran ukuran (Garansi Tukar 7 Hari)?",
    answer:
      "Jika pakaian atau alas kaki yang kamu terima kurang pas ukurannya, kamu bisa mengajukan penukaran dalam waktu 7 hari sejak barang diterima. Pastikan hangtag masih terpasang, belum dicuci, dan dalam kondisi baru. Cukup hubungi Toko Care via WhatsApp dengan menyertakan nomor pesanan dan ukuran pengganti yang diinginkan.",
  },
  {
    id: "faq-2",
    category: "shipping",
    question: "Berapa lama estimasi pengiriman pesanan saya?",
    answer:
      "Untuk pengiriman Reguler (SiCepat/JNE) estimasi 1-2 hari kerja untuk wilayah Jabodetabek, dan 2-4 hari kerja untuk luar Jabodetabek. Untuk layanan Same Day (GoSend) paket akan tiba dalam 6-8 jam setelah pesanan terverifikasi.",
  },
  {
    id: "faq-3",
    category: "shipping",
    question: "Apakah pengiriman ke seluruh Indonesia gratis ongkir?",
    answer:
      "Ya! MyShop menyediakan subsidi Bebas Ongkir hingga Rp 40.000 dengan minimal transaksi belanja hanya Rp 50.000 ke seluruh wilayah Indonesia tanpa perlu klaim voucher tambahan.",
  },
  {
    id: "faq-4",
    category: "payment",
    question: "Apa saja metode pembayaran yang didukung?",
    answer:
      "Kami menerima pembayaran otomatis instan via QRIS (GoPay, OVO, ShopeePay, BCA Mobile), Transfer Virtual Account (BCA & Mandiri), serta saldo E-Wallet terhubung tanpa biaya admin tersembunyi.",
  },
  {
    id: "faq-5",
    category: "order",
    question: "Bagaimana cara melacak nomor resi pengiriman?",
    answer:
      "Setelah pembayaran berhasil, pesananmu akan diproses dan nomor resi otomatis diterbitkan. Kamu bisa memantau status posisi kurir secara real-time di halaman 'Lacak Pesanan / Resi' dengan memasukkan kode pesanan (contoh: ORD-849201).",
  },
  {
    id: "faq-6",
    category: "exchange",
    question: "Bagaimana jika barang yang saya terima cacat produksi?",
    answer:
      "Kami menjamin 100% kepuasan pelanggan. Jika ada cacat jahitan atau kerusakan produksi, seluruh biaya ongkos kirim pengembalian dan penggantian produk baru akan ditanggung sepenuhnya oleh pihak MyShop.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [openAccordion, setOpenAccordion] = useState<string | null>("faq-1");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const filteredFAQs = FAQ_LIST.filter((item) => {
    if (selectedCat !== "all" && item.category !== selectedCat) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
  });

  return (
    <div className={`container mx-auto px-8 ${styles.pageContainer}`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <ChevronRight size={14} />
        <span className={styles.breadcrumbCurrent}>Pusat Bantuan & Toko Care</span>
      </nav>

      {/* Hero Help Card */}
      <div className={styles.heroHelpCard}>
        <span className={styles.helpBadge}>Pusat Bantuan Pelanggan</span>
        <h1 className={styles.heroTitle}>Ada yang bisa kami bantu?</h1>
        <p className={styles.heroSubtitle}>
          Temukan jawaban cepat seputar transaksi, pengiriman bebas ongkir, panduan penukaran ukuran, dan kebijakan belanja.
        </p>

        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Cari pertanyaan... (contoh: tukar ukuran, ongkir, resi)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* 4 Topic Category Cards */}
      <div className={styles.categoryGrid}>
        <div
          onClick={() => setSelectedCat(selectedCat === "exchange" ? "all" : "exchange")}
          className={`${styles.categoryCard} ${selectedCat === "exchange" ? styles.categoryCardActive : ""}`}
        >
          <div className={styles.catIconWrapper}>
            <RotateCcw size={20} />
          </div>
          <div>
            <h2 className={styles.catTitle}>Garansi Tukar 7 Hari</h2>
            <p className={styles.catDesc}>Salah ukuran atau kurang pas? Tukar mudah tanpa ribet.</p>
          </div>
        </div>

        <div
          onClick={() => setSelectedCat(selectedCat === "shipping" ? "all" : "shipping")}
          className={`${styles.categoryCard} ${selectedCat === "shipping" ? styles.categoryCardActive : ""}`}
        >
          <div className={styles.catIconWrapper}>
            <Truck size={20} />
          </div>
          <div>
            <h2 className={styles.catTitle}>Pengiriman & Bebas Ongkir</h2>
            <p className={styles.catDesc}>Estimasi waktu tiba, kurir ekspedisi, dan subsidi ongkir.</p>
          </div>
        </div>

        <div
          onClick={() => setSelectedCat(selectedCat === "payment" ? "all" : "payment")}
          className={`${styles.categoryCard} ${selectedCat === "payment" ? styles.categoryCardActive : ""}`}
        >
          <div className={styles.catIconWrapper}>
            <CreditCard size={20} />
          </div>
          <div>
            <h2 className={styles.catTitle}>Pembayaran & Promo</h2>
            <p className={styles.catDesc}>Panduan QRIS, Virtual Account, dan kupon voucher.</p>
          </div>
        </div>

        <div
          onClick={() => setSelectedCat(selectedCat === "order" ? "all" : "order")}
          className={`${styles.categoryCard} ${selectedCat === "order" ? styles.categoryCardActive : ""}`}
        >
          <div className={styles.catIconWrapper}>
            <ShoppingBag size={20} />
          </div>
          <div>
            <h2 className={styles.catTitle}>Pesanan & Akun</h2>
            <p className={styles.catDesc}>Lacak nomor resi, ubah alamat, dan status pembelian.</p>
          </div>
        </div>
      </div>

      {/* Main Content Layout: FAQs + Toko Care Card */}
      <div className={styles.mainLayout}>
        {/* Left: Accordion FAQs */}
        <section className={styles.faqSection}>
          <h2 className={styles.faqSectionTitle}>Pertanyaan yang Sering Diajukan (FAQ)</h2>

          {filteredFAQs.length === 0 ? (
            <p style={{ color: "#64748b", padding: "20px 0" }}>
              Tidak ditemukan pertanyaan yang cocok dengan pencarian &quot;{searchQuery}&quot;. Silakan hubungi tim CS kami melalui WhatsApp di samping.
            </p>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openAccordion === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className={styles.accordionHeader}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ""}`}
                    />
                  </button>

                  {isOpen && <div className={styles.accordionBody}>{faq.answer}</div>}
                </div>
              );
            })
          )}
        </section>

        {/* Right Sidebar: Toko Care Contact Card */}
        <aside className={styles.contactCard}>
          <div className={styles.contactHeader}>
            <div className={styles.contactHeaderIcon}>
              <HelpCircle size={22} />
            </div>
            <div>
              <h2 className={styles.contactTitle}>Toko Care</h2>
              <span className={styles.contactSubtitle}>Layanan Pelanggan Resmi</span>
            </div>
          </div>

          <p className={styles.contactDesc}>
            Butuh bantuan langsung dengan pesananmu? Tim customer care kami siap membantu dengan ramah dan cepat.
          </p>

          <div className={styles.contactOptions}>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactBtn} ${styles.btnWhatsapp}`}
            >
              <MessageCircle size={18} />
              <span>Chat WhatsApp Resmi</span>
            </a>

            <a
              href="mailto:support@myshop.id"
              className={`${styles.contactBtn} ${styles.btnEmail}`}
            >
              <Mail size={18} />
              <span>Kirim Email Support</span>
            </a>
          </div>

          <div className={styles.operatingHours}>
            <Clock size={16} />
            <span>Setiap Hari: 08:00 - 21:00 WIB</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
