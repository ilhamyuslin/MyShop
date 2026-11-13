"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Truck,
  CheckCircle2,
  PackageCheck,
  Clock,
  ChevronRight,
  Copy,
  Check,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import styles from "@/styles/store/orders.module.css";

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: "shipping" | "processing" | "completed";
  courier: string;
  resi: string;
  eta: string;
  currentLocation: string;
  stepActive: number; // 0: bayar, 1: dikemas, 2: dikirim, 3: selesai
  items: OrderItem[];
  total: number;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-849201",
    date: "13 Nov 2026, 10:15 WIB",
    status: "shipping",
    courier: "SiCepat Reguler",
    resi: "004289192411",
    eta: "Besok, 14 Nov (14:00 - 18:00 WIB)",
    currentLocation: "Paket telah diberangkatkan dari Hub Jakarta Selatan menuju DC transit",
    stepActive: 2,
    items: [
      {
        name: "Linen Relaxed Casual Shirt (Linen Cream, Size L)",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80",
        quantity: 1,
        price: 199000,
      },
      {
        name: "Retro Minimalist Canvas Sneakers (Vintage Maroon, Size 42)",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=300&q=80",
        quantity: 1,
        price: 389000,
      },
    ],
    total: 589000,
  },
  {
    id: "ORD-739120",
    date: "10 Nov 2026, 14:30 WIB",
    status: "completed",
    courier: "GoSend Same Day",
    resi: "GK-99214482",
    eta: "Tiba pada 10 Nov 2026",
    currentLocation: "Paket telah diterima oleh [YUSLIN / Penerima Langsung]",
    stepActive: 3,
    items: [
      {
        name: "Ceramic Insulated Travel Tumbler 500ml (Chalk White)",
        image: "https://images.unsplash.com/photo-1570784332176-fdd73da66f03?auto=format&fit=crop&w=300&q=80",
        quantity: 2,
        price: 135000,
      },
    ],
    total: 271000,
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"all" | "shipping" | "completed">("all");
  const [searchResi, setSearchResi] = useState("");
  const [copiedResi, setCopiedResi] = useState<string | null>(null);

  const handleCopy = (resi: string) => {
    navigator.clipboard.writeText(resi);
    setCopiedResi(resi);
    setTimeout(() => setCopiedResi(null), 2000);
  };

  const filteredOrders = INITIAL_ORDERS.filter((order) => {
    if (activeTab === "shipping") return order.status === "shipping";
    if (activeTab === "completed") return order.status === "completed";
    return true;
  }).filter((order) => {
    if (!searchResi) return true;
    const q = searchResi.toLowerCase();
    return (
      order.id.toLowerCase().includes(q) ||
      order.resi.toLowerCase().includes(q) ||
      order.items.some((i) => i.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className={`container mx-auto px-8 ${styles.pageContainer}`}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Beranda</Link>
        <ChevronRight size={14} />
        <span className={styles.breadcrumbCurrent}>Konfirmasi & Lacak Pesanan</span>
      </nav>

      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Lacak Pesanan & Riwayat Pembelian</h1>
        <p className={styles.pageSubtitle}>
          Pantau proses pengemasan dan perjalanan kurir pesananmu secara real-time
        </p>
      </div>

      {/* Cek Resi / Cari Pesanan Box */}
      <div className={styles.searchBoxCard}>
        <div className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Masukkan Nomor Pesanan atau Nomor Resi (contoh: ORD-849201, 004289...)"
              value={searchResi}
              onChange={(e) => setSearchResi(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button type="button" className={styles.searchBtn}>
            <span>Cari Resi</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className={styles.tabsNav}>
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabBtnActive : ""}`}
        >
          Semua Pesanan ({INITIAL_ORDERS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={`${styles.tabBtn} ${activeTab === "shipping" ? styles.tabBtnActive : ""}`}
        >
          Dalam Pengiriman (1)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("completed")}
          className={`${styles.tabBtn} ${activeTab === "completed" ? styles.tabBtnActive : ""}`}
        >
          Selesai (1)
        </button>
      </div>

      {/* Orders List */}
      <div className={styles.ordersList}>
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <PackageCheck size={32} />
            </div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
              Tidak Ada Pesanan Ditemukan
            </h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b", marginBottom: 20 }}>
              Coba periksa kembali nomor pesanan atau nomor resi yang kamu cari.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchResi("");
                setActiveTab("all");
              }}
              style={{
                padding: "8px 20px",
                background: "#f1f5f9",
                borderRadius: 8,
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isDelivered = order.status === "completed";

            return (
              <div key={order.id} className={styles.orderCard}>
                {/* Order Top Meta */}
                <div className={styles.orderCardHeader}>
                  <div className={styles.orderMetaLeft}>
                    <span className={styles.orderId}>{order.id}</span>
                    <span style={{ color: "#cbd5e1" }}>•</span>
                    <span className={styles.orderDate}>{order.date}</span>
                  </div>

                  <div>
                    {order.status === "shipping" && (
                      <span className={`${styles.statusBadge} ${styles.statusShipping}`}>
                        <Truck size={14} /> Dalam Pengiriman
                      </span>
                    )}
                    {order.status === "completed" && (
                      <span className={`${styles.statusBadge} ${styles.statusCompleted}`}>
                        <CheckCircle2 size={14} /> Pesanan Selesai
                      </span>
                    )}
                  </div>
                </div>

                {/* Stepper / Timeline Visual */}
                <div className={styles.stepperWrapper}>
                  <div className={styles.stepperSteps}>
                    {[
                      { label: "Pesanan Dibuat", time: "10:15 WIB" },
                      { label: "Sedang Dikemas", time: "11:20 WIB" },
                      { label: "Dalam Pengiriman", time: "13:45 WIB" },
                      { label: "Pesanan Diterima", time: isDelivered ? "Selesai" : "Estimasi Besok" },
                    ].map((step, idx) => {
                      const isDone = idx < order.stepActive;
                      const isActive = idx === order.stepActive;

                      return (
                        <div key={idx} className={styles.stepItem}>
                          <div
                            className={`${styles.stepCircle} ${
                              isDone
                                ? styles.stepCircleDone
                                : isActive
                                ? styles.stepCircleActive
                                : styles.stepCirclePending
                            }`}
                          >
                            {isDone ? <Check size={16} strokeWidth={3} /> : idx + 1}
                          </div>
                          <span className={styles.stepLabel}>{step.label}</span>
                          <span className={styles.stepTime}>{step.time}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Posisi Paket Terkini */}
                  <div className={styles.courierLiveBox}>
                    <div className={styles.courierLiveLeft}>
                      <Truck size={16} color="#2d5a43" />
                      <span>
                        <strong>{order.courier}</strong>: {order.currentLocation}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#64748b" }}>Resi: <strong>{order.resi}</strong></span>
                      <button
                        type="button"
                        onClick={() => handleCopy(order.resi)}
                        className={styles.resiCopyBtn}
                        title="Salin nomor resi"
                      >
                        {copiedResi === order.resi ? (
                          <>
                            <Check size={13} color="#10b981" />
                            <span style={{ color: "#10b981" }}>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Items in this order */}
                <div>
                  {order.items.map((item, i) => (
                    <div key={i} className={styles.orderProductRow}>
                      <div className={styles.orderProductLeft}>
                        <div className={styles.orderProductThumb}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="60px"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <div className={styles.orderProductName}>{item.name}</div>
                          <div className={styles.orderProductQty}>
                            {item.quantity} barang x {formatRupiah(item.price)}
                          </div>
                        </div>
                      </div>
                      <div className={styles.orderProductPrice}>
                        {formatRupiah(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer & Actions */}
                <div className={styles.orderCardFooter}>
                  <div className={styles.orderTotalBlock}>
                    <span className={styles.orderTotalLabel}>Total Pesanan</span>
                    <span className={styles.orderTotalAmount}>{formatRupiah(order.total)}</span>
                  </div>

                  <div className={styles.orderActions}>
                    <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnSecondary}
                    >
                      <MessageCircle size={14} />
                      <span>Toko Care</span>
                    </a>
                    <Link href="/products" className={styles.btnPrimary}>
                      <ShoppingBag size={14} />
                      <span>Beli Lagi</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

