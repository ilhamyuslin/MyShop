"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Edit2,
  X,
  QrCode,
  Building,
  Wallet,
  ShoppingBag,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import styles from "@/styles/store/checkout.module.css";

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, clearCart } = useCartStore();

  // Address State
  const [address, setAddress] = useState({
    name: "Ilham Yuslin",
    phone: "0812-3456-7890",
    city: "Jakarta Selatan, DKI Jakarta",
    street: "Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan 12190",
  });
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [tempAddress, setTempAddress] = useState(address);

  // Courier Options
  const COURIER_OPTIONS = [
    { id: "reg", name: "Reguler (SiCepat)", eta: "1-2 Hari Kerja", cost: 0, isFree: true },
    { id: "exp", name: "Next Day (JNE YES)", eta: "Besok Tiba", cost: 18000, isFree: false },
    { id: "sam", name: "Same Day (GoSend)", eta: "6-8 Jam", cost: 25000, isFree: false },
  ];
  const [selectedCourier, setSelectedCourier] = useState(COURIER_OPTIONS[0]);

  // Payment Methods
  const PAYMENT_METHODS = [
    {
      id: "qris",
      name: "QRIS Instant (GoPay / OVO / ShopeePay / BCA)",
      sub: "Bebas biaya admin • Verifikasi otomatis",
      icon: QrCode,
      badge: "Paling Cepat",
    },
    {
      id: "bca_va",
      name: "BCA Virtual Account",
      sub: "Bayar dari m-BCA / KlikBCA / ATM BCA",
      icon: Building,
      badge: "Populer",
    },
    {
      id: "mandiri_va",
      name: "Mandiri Virtual Account",
      sub: "Bayar dari Livin' by Mandiri / ATM Mandiri",
      icon: Building,
    },
    {
      id: "ewallet",
      name: "Saldo E-Wallet Terhubung",
      sub: "GoPay / Dana / ShopeePay",
      icon: Wallet,
    },
  ];
  const [selectedPayment, setSelectedPayment] = useState(PAYMENT_METHODS[0]);

  // Order Success Modal State
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-8 py-20 text-center text-slate-400">
        Memuat halaman pembayaran...
      </div>
    );
  }

  // Jika cart kosong dan belum proses sukses, arahkan ke cart
  if (items.length === 0 && !isSuccessModalOpen) {
    return (
      <div className={`container mx-auto px-8 ${styles.pageContainer}`}>
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <ShoppingBag size={48} color="#2d5a43" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>
            Tidak ada barang untuk di-checkout
          </h2>
          <p style={{ color: "#64748b", marginBottom: 20 }}>
            Keranjang belanjamu saat ini masih kosong.
          </p>
          <Link
            href="/products"
            style={{
              padding: "10px 24px",
              background: "#2d5a43",
              color: "#ffffff",
              borderRadius: 10,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Lihat Produk
          </Link>
        </div>
      </div>
    );
  }

  const itemsSubtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = selectedCourier.cost;
  const adminFee = 1000;
  const grandTotal = itemsSubtotal + shippingFee + adminFee;

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setAddress(tempAddress);
    setIsEditAddressOpen(false);
  };

  const handleProcessOrder = () => {
    const generatedId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsSuccessModalOpen(true);
    clearCart(); // Kosongkan cart setelah bayar
  };

  return (
    <div className={`container mx-auto px-8 ${styles.pageContainer}`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <ChevronRight size={14} />
        <Link href="/cart">Keranjang</Link>
        <ChevronRight size={14} />
        <span className={styles.breadcrumbCurrent}>Pembayaran & Checkout</span>
      </nav>

      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Pembayaran & Pengiriman</h1>
        <p className={styles.pageSubtitle}>
          Pastikan alamat dan pilihan kurir sudah sesuai sebelum menyelesaikan pesanan
        </p>
      </div>

      <div className={styles.checkoutGrid}>
        {/* Left Column: Form Sections */}
        <div className={styles.mainCol}>
          {/* Section 1: Delivery Address */}
          <section className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <MapPin size={20} className={styles.cardTitleIcon} />
                <span>Alamat Pengiriman</span>
              </h2>
              <button
                type="button"
                onClick={() => {
                  setTempAddress(address);
                  setIsEditAddressOpen(true);
                }}
                className={styles.editActionBtn}
              >
                <Edit2 size={13} style={{ display: "inline", marginRight: 4 }} />
                Ubah Alamat
              </button>
            </div>

            <div className={styles.addressBox}>
              <div className={styles.recipientName}>
                <span>{address.name}</span>
                <span className={styles.primaryBadge}>Utama</span>
              </div>
              <div className={styles.phoneNumber}>{address.phone}</div>
              <div className={styles.fullAddress}>{address.street}</div>
            </div>
          </section>

          {/* Section 2: Items Summary Preview */}
          <section className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <ShoppingBag size={20} className={styles.cardTitleIcon} />
                <span>Barang yang Dipesan ({items.length})</span>
              </h2>
              <Link href="/cart" className={styles.editActionBtn}>
                Edit Keranjang
              </Link>
            </div>

            <div className={styles.itemsPreviewList}>
              {items.map((item) => (
                <div key={item.id} className={styles.previewItem}>
                  <div className={styles.previewThumb}>
                    <Image
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80"
                      }
                      alt={item.name}
                      fill
                      sizes="56px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className={styles.previewInfo}>
                    <h3 className={styles.previewName}>{item.name}</h3>
                    <div className={styles.previewQty}>
                      {item.quantity} barang x {formatRupiah(item.price)}
                    </div>
                  </div>
                  <div className={styles.previewPrice}>
                    {formatRupiah(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Courier Selection */}
          <section className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <Truck size={20} className={styles.cardTitleIcon} />
                <span>Pilih Opsi Pengiriman</span>
              </h2>
            </div>

            <div className={styles.courierOptionsGrid}>
              {COURIER_OPTIONS.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourier(c)}
                  className={`${styles.courierCard} ${
                    selectedCourier.id === c.id ? styles.courierCardActive : ""
                  }`}
                >
                  <div className={styles.courierTop}>
                    <span className={styles.courierName}>{c.name}</span>
                    {c.isFree && <span className={styles.freeDeliveryPill}>Bebas Ongkir</span>}
                  </div>
                  <div className={styles.courierEta}>Estimasi: {c.eta}</div>
                  <div className={styles.courierCost}>
                    {c.cost === 0 ? "Rp 0" : formatRupiah(c.cost)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Payment Method */}
          <section className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <CreditCard size={20} className={styles.cardTitleIcon} />
                <span>Metode Pembayaran</span>
              </h2>
            </div>

            <div className={styles.paymentList}>
              {PAYMENT_METHODS.map((pm) => {
                const IconComponent = pm.icon;
                const isSelected = selectedPayment.id === pm.id;

                return (
                  <div
                    key={pm.id}
                    onClick={() => setSelectedPayment(pm)}
                    className={`${styles.paymentOption} ${
                      isSelected ? styles.paymentOptionActive : ""
                    }`}
                  >
                    <div className={styles.paymentLeft}>
                      <div
                        className={`${styles.radioCircle} ${
                          isSelected ? styles.radioCircleActive : ""
                        }`}
                      >
                        {isSelected && <div className={styles.radioInner} />}
                      </div>
                      <IconComponent size={20} color={isSelected ? "#2d5a43" : "#64748b"} />
                      <div>
                        <div className={styles.paymentName}>{pm.name}</div>
                        <div className={styles.paymentSub}>{pm.sub}</div>
                      </div>
                    </div>
                    {pm.badge && <span className={styles.paymentBadge}>{pm.badge}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Summary Box */}
        <div className={styles.summaryCol}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryHeader}>Ringkasan Pembayaran</h2>

            <div className={styles.summaryRow}>
              <span>Total Harga ({items.reduce((a, b) => a + b.quantity, 0)} barang)</span>
              <span className={styles.summaryRowValue}>{formatRupiah(itemsSubtotal)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Biaya Pengiriman</span>
              {shippingFee === 0 ? (
                <span className={styles.freeShippingTag}>Gratis</span>
              ) : (
                <span className={styles.summaryRowValue}>{formatRupiah(shippingFee)}</span>
              )}
            </div>

            <div className={styles.summaryRow}>
              <span>Biaya Layanan & Asuransi</span>
              <span className={styles.summaryRowValue}>{formatRupiah(adminFee)}</span>
            </div>

            <div className={styles.totalDivider} />

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total Tagihan</span>
              <span className={styles.totalAmount}>{formatRupiah(grandTotal)}</span>
            </div>

            <button
              type="button"
              onClick={handleProcessOrder}
              className={styles.payNowBtn}
            >
              <span>Bayar Sekarang</span>
              <ChevronRight size={18} />
            </button>

            <div className={styles.summaryTrust}>
              <ShieldCheck size={16} color="#2d5a43" />
              <span>Transaksi dienkripsi aman 256-bit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit Alamat */}
      {isEditAddressOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsEditAddressOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setIsEditAddressOpen(false)}
            >
              <X size={20} />
            </button>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
              Ubah Alamat Pengiriman
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Pastikan nama dan nomor HP aktif untuk mempermudah kurir mengantar barang.
            </p>

            <form onSubmit={handleSaveAddress} className={styles.modalInputGroup}>
              <div className={styles.modalInputField}>
                <label className={styles.modalInputLabel}>Nama Penerima</label>
                <input
                  type="text"
                  required
                  value={tempAddress.name}
                  onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })}
                  className={styles.modalTextInput}
                />
              </div>

              <div className={styles.modalInputField}>
                <label className={styles.modalInputLabel}>Nomor WhatsApp / HP</label>
                <input
                  type="text"
                  required
                  value={tempAddress.phone}
                  onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })}
                  className={styles.modalTextInput}
                />
              </div>

              <div className={styles.modalInputField}>
                <label className={styles.modalInputLabel}>Alamat Lengkap</label>
                <textarea
                  required
                  rows={3}
                  value={tempAddress.street}
                  onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })}
                  className={styles.modalTextarea}
                />
              </div>

              <button type="submit" className={styles.modalSaveBtn}>
                Simpan Alamat
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Order Success State */}
      {isSuccessModalOpen && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modalContent}
            style={{ textAlign: "center", padding: "40px 32px" }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#ecfdf5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#10b981",
                margin: "0 auto 20px",
              }}
            >
              <CheckCircle2 size={42} strokeWidth={2.5} />
            </div>

            <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#1e293b", marginBottom: 8 }}>
              Pesanan Berhasil Dibuat!
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: 20 }}>
              Terima kasih telah berbelanja di MyShop. Nomor pesananmu adalah:
            </p>

            <div
              style={{
                display: "inline-block",
                padding: "8px 20px",
                background: "#f1f3f0",
                borderRadius: 8,
                fontWeight: 800,
                color: "#2d5a43",
                fontSize: "1.1rem",
                letterSpacing: "0.05em",
                marginBottom: 24,
              }}
            >
              {orderId}
            </div>

            <p style={{ fontSize: "0.82rem", color: "#94a3b8", marginBottom: 28 }}>
              Konfirmasi dan rincian transaksi telah dikirimkan ke nomor WhatsApp terdaftar. Pesananmu akan segera diproses oleh tim kami.
            </p>

            <div style={{ display: "flex", gap: 12 }}>
              <Link
                href="/orders"
                style={{
                  flex: 1,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid #2d5a43",
                  color: "#2d5a43",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                }}
              >
                Lacak Pesanan
              </Link>
              <Link
                href="/"
                style={{
                  flex: 1,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#2d5a43",
                  color: "#ffffff",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  textDecoration: "none",
                }}
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
