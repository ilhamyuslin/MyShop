"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  MapPin,
  Package,
  Ticket,
  Heart,
  Settings,
  LogOut,
  Plus,
  CheckCircle2,
  Edit2,
  Trash2,
  ShieldCheck,
  ChevronRight,
  X
} from "lucide-react";
import styles from "@/styles/store/profile.module.css";

interface Address {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  fullAddress: string;
  isDefault: boolean;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "addresses" | "orders" | "vouchers">("profile");

  // User details state
  const [userData, setUserData] = useState({
    name: "Ilham Yuslin",
    email: "ilham.yuslin@example.com",
    phone: "0812-3456-7890",
    birthDate: "1998-05-14",
    gender: "Laki-laki"
  });

  // Saved addresses state
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      label: "Rumah (Utama)",
      recipient: "Ilham Yuslin",
      phone: "0812-3456-7890",
      fullAddress: "Jl. Sudirman No. 42, RT 03 / RW 05, Menteng, Jakarta Pusat, DKI Jakarta 10310",
      isDefault: true
    },
    {
      id: "addr-2",
      label: "Kantor",
      recipient: "Ilham Yuslin (Head Office)",
      phone: "0812-9876-5432",
      fullAddress: "Gedung Cyber 2 Tower Lt. 18, Jl. H. R. Rasuna Said Blok X-5 No. 13, Jakarta Selatan 12950",
      isDefault: false
    }
  ]);

  // Modal add/edit address state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [formAddress, setFormAddress] = useState({
    label: "Rumah",
    recipient: "",
    phone: "",
    fullAddress: "",
    isDefault: false
  });

  const handleOpenAddModal = () => {
    setModalMode("add");
    setFormAddress({
      label: "Rumah",
      recipient: userData.name,
      phone: userData.phone,
      fullAddress: "",
      isDefault: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (addr: Address) => {
    setModalMode("edit");
    setCurrentEditId(addr.id);
    setFormAddress({
      label: addr.label,
      recipient: addr.recipient,
      phone: addr.phone,
      fullAddress: addr.fullAddress,
      isDefault: addr.isDefault
    });
    setIsModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === "add") {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        label: formAddress.label,
        recipient: formAddress.recipient,
        phone: formAddress.phone,
        fullAddress: formAddress.fullAddress,
        isDefault: formAddress.isDefault || addresses.length === 0
      };
      if (newAddr.isDefault) {
        setAddresses(addresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
      } else {
        setAddresses([...addresses, newAddr]);
      }
    } else if (modalMode === "edit" && currentEditId) {
      setAddresses(
        addresses.map((a) => {
          if (a.id === currentEditId) {
            return {
              ...a,
              label: formAddress.label,
              recipient: formAddress.recipient,
              phone: formAddress.phone,
              fullAddress: formAddress.fullAddress,
              isDefault: formAddress.isDefault
            };
          }
          if (formAddress.isDefault) {
            return { ...a, isDefault: false };
          }
          return a;
        })
      );
    }
    setIsModalOpen(false);
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className={styles.profileContainer}>
      <div className="container mx-auto px-8">
        <div className={styles.profileLayout}>
          {/* Left Sidebar Menu */}
          <div className={styles.profileSidebar}>
            <div className={styles.userSummary}>
              <div className={styles.avatar}>
                {userData.name.charAt(0)}
              </div>
              <div>
                <h3 className={styles.userName}>{userData.name}</h3>
                <span className={styles.userBadge}>
                  <ShieldCheck size={12} />
                  <span>Verified Member</span>
                </span>
              </div>
            </div>

            <div className={styles.menuList}>
              <button
                type="button"
                className={`${styles.menuItem} ${activeTab === "profile" ? styles.active : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} />
                <span>Biodata Diri</span>
              </button>

              <button
                type="button"
                className={`${styles.menuItem} ${activeTab === "addresses" ? styles.active : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin size={18} />
                <span>Daftar Alamat</span>
                <span className={styles.badgeCount}>{addresses.length}</span>
              </button>

              <Link href="/orders" className={styles.menuItem}>
                <Package size={18} />
                <span>Lacak Pesanan</span>
              </Link>

              <button
                type="button"
                className={`${styles.menuItem} ${activeTab === "vouchers" ? styles.active : ""}`}
                onClick={() => setActiveTab("vouchers")}
              >
                <Ticket size={18} />
                <span>Voucher Saya</span>
                <span className={styles.badgeCount} style={{ backgroundColor: "#2d5a43" }}>2</span>
              </button>

              <Link href="/cart" className={styles.menuItem}>
                <Heart size={18} />
                <span>Keranjang Belanja</span>
              </Link>

              <hr style={{ border: "none", borderTop: "1px solid #f0f0ed", margin: "10px 0" }} />

              <Link href="/login" className={styles.menuItem} style={{ color: "#c85a32" }}>
                <LogOut size={18} />
                <span>Keluar Akun</span>
              </Link>
            </div>
          </div>

          {/* Right Main Content */}
          <div className={styles.contentCard}>
            {/* TAB: Biodata Diri */}
            {activeTab === "profile" && (
              <div>
                <div className={styles.contentHeader}>
                  <div>
                    <h2 className={styles.contentTitle}>Biodata Diri</h2>
                    <p className={styles.contentSubtitle}>
                      Kelola informasi profil akun Anda untuk keamanan dan kenyamanan bertransaksi.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Perubahan profil berhasil disimpan!");
                  }}
                >
                  <div className={styles.formGrid}>
                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Nama Lengkap</label>
                      <input
                        type="text"
                        className={styles.fieldInput}
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Alamat Email</label>
                      <input
                        type="email"
                        className={styles.fieldInput}
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Nomor Handphone / WhatsApp</label>
                      <input
                        type="tel"
                        className={styles.fieldInput}
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        required
                      />
                    </div>

                    <div className={styles.formField}>
                      <label className={styles.fieldLabel}>Tanggal Lahir</label>
                      <input
                        type="date"
                        className={styles.fieldInput}
                        value={userData.birthDate}
                        onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className={styles.saveBtn}>
                    Simpan Perubahan
                  </button>
                </form>
              </div>
            )}

            {/* TAB: Daftar Alamat */}
            {activeTab === "addresses" && (
              <div>
                <div className={styles.contentHeader}>
                  <div>
                    <h2 className={styles.contentTitle}>Daftar Alamat Pengiriman</h2>
                    <p className={styles.contentSubtitle}>
                      Atur alamat tujuan pengiriman pesanan Anda agar checkout lebih cepat.
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={handleOpenAddModal}
                  >
                    <Plus size={16} />
                    <span>Tambah Alamat Baru</span>
                  </button>
                </div>

                <div className={styles.addressGrid}>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`${styles.addressCard} ${addr.isDefault ? styles.isDefault : ""}`}
                    >
                      <div className={styles.addressCardHeader}>
                        <span className={styles.addressLabel}>{addr.label}</span>
                        {addr.isDefault && (
                          <span className={styles.defaultBadge}>Utama</span>
                        )}
                      </div>

                      <div className={styles.addressRecipient}>{addr.recipient}</div>
                      <div className={styles.addressPhone}>{addr.phone}</div>
                      <div className={styles.addressFull}>{addr.fullAddress}</div>

                      <div className={styles.addressCardActions}>
                        <button
                          type="button"
                          className={styles.addressActionBtn}
                          onClick={() => handleOpenEditModal(addr)}
                        >
                          Ubah Alamat
                        </button>
                        {!addr.isDefault && (
                          <>
                            <span>•</span>
                            <button
                              type="button"
                              className={styles.addressActionBtn}
                              onClick={() => handleSetDefault(addr.id)}
                            >
                              Jadikan Alamat Utama
                            </button>
                            <span>•</span>
                            <button
                              type="button"
                              className={`${styles.addressActionBtn} ${styles.danger}`}
                              onClick={() => handleDeleteAddress(addr.id)}
                            >
                              Hapus
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: Voucher Saya */}
            {activeTab === "vouchers" && (
              <div>
                <div className={styles.contentHeader}>
                  <div>
                    <h2 className={styles.contentTitle}>Voucher Promo Aktif</h2>
                    <p className={styles.contentSubtitle}>
                      Gunakan voucher berikut saat checkout untuk menikmati potongan harga.
                    </p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div
                    style={{
                      border: "1.5px dashed #2d5a43",
                      borderRadius: "12px",
                      padding: "20px",
                      backgroundColor: "#f7faf8"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#2d5a43" }}>VOUCHER DISKON</span>
                      <span style={{ fontSize: "11px", color: "#717680" }}>Berlaku s/d 30 Nov 2026</span>
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "#1c1f26", marginBottom: "4px" }}>
                      Potongan Rp 20.000
                    </div>
                    <div style={{ fontSize: "12px", color: "#475467", marginBottom: "12px" }}>
                      Min. belanja Rp 100.000 untuk semua kategori
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        backgroundColor: "#ffffff",
                        border: "1px solid #2d5a43",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#2d5a43"
                      }}
                    >
                      KODE: DISKON20
                    </div>
                  </div>

                  <div
                    style={{
                      border: "1.5px dashed #2d5a43",
                      borderRadius: "12px",
                      padding: "20px",
                      backgroundColor: "#f7faf8"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#2d5a43" }}>GRATIS ONGKIR</span>
                      <span style={{ fontSize: "11px", color: "#717680" }}>Berlaku s/d 31 Des 2026</span>
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: 800, color: "#1c1f26", marginBottom: "4px" }}>
                      Gratis Ongkir Xtra s/d Rp 20rb
                    </div>
                    <div style={{ fontSize: "12px", color: "#475467", marginBottom: "12px" }}>
                      Tanpa minimum belanja untuk kurir reguler
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        backgroundColor: "#ffffff",
                        border: "1px solid #2d5a43",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#2d5a43"
                      }}
                    >
                      KODE: ONGKIRGRATIS
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add / Edit Address Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {modalMode === "add" ? "Tambah Alamat Baru" : "Ubah Alamat"}
              </h3>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className={styles.modalForm}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Label Alamat (Contoh: Rumah, Kantor, Kos)</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={formAddress.label}
                  onChange={(e) => setFormAddress({ ...formAddress, label: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Nama Penerima</label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={formAddress.recipient}
                  onChange={(e) => setFormAddress({ ...formAddress, recipient: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Nomor WhatsApp / HP</label>
                <input
                  type="tel"
                  className={styles.fieldInput}
                  value={formAddress.phone}
                  onChange={(e) => setFormAddress({ ...formAddress, phone: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Alamat Lengkap</label>
                <textarea
                  rows={3}
                  className={styles.fieldInput}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota & kode pos"
                  value={formAddress.fullAddress}
                  onChange={(e) => setFormAddress({ ...formAddress, fullAddress: e.target.value })}
                  required
                />
              </div>

              <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={formAddress.isDefault}
                  onChange={(e) => setFormAddress({ ...formAddress, isDefault: e.target.checked })}
                  style={{ accentColor: "#2d5a43" }}
                />
                <span>Jadikan sebagai alamat utama</span>
              </label>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Simpan Alamat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
