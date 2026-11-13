"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Percent
} from "lucide-react";
import styles from "@/styles/store/auth.module.css";

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful auth & redirect to home
      router.push("/");
    }, 1000);
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        {/* Left Side: Brand Showcase & Value Props */}
        <div className={styles.bannerSection}>
          <div>
            <div className={styles.brandLogo}>
              <span>MyShop</span>
              <span className={styles.brandDot}></span>
            </div>

            <div className={styles.promoContent}>
              <div className={styles.promoTag}>
                <Sparkles size={14} />
                <span>Eksklusif Pengguna Baru</span>
              </div>
              <h2 className={styles.promoTitle}>
                Belanja Lebih Nyaman, Praktis, & Terpercaya.
              </h2>
              <p className={styles.promoDesc}>
                Nikmati gratis ongkir ke seluruh Indonesia, voucher diskon hingga 50%, dan jaminan 100% produk original.
              </p>
            </div>
          </div>

          <div className={styles.benefitList}>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>
                <Truck size={14} />
              </div>
              <span>Gratis Ongkir Xtra tanpa minimal belanja</span>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>
                <Percent size={14} />
              </div>
              <span>Welcome Voucher potongan 20% kode: <strong>DISKON20</strong></span>
            </div>
            <div className={styles.benefitItem}>
              <div className={styles.benefitIcon}>
                <ShieldCheck size={14} />
              </div>
              <span>Garansi 7 hari pengembalian tanpa ribet</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Login / Register Form */}
        <div className={styles.formSection}>
          <div className={styles.tabHeader}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "login" ? styles.active : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Masuk Akun
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === "register" ? styles.active : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Daftar Baru
            </button>
          </div>

          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>
              {activeTab === "login" ? "Selamat Datang Kembali!" : "Buat Akun MyShop"}
            </h1>
            <p className={styles.formSubtitle}>
              {activeTab === "login"
                ? "Masukkan email atau nomor HP untuk melanjutkan belanja."
                : "Daftar dalam 1 menit dan nikmati semua benefit eksklusif."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === "register" && (
              <>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Nama Lengkap</label>
                  <div className={styles.inputWrapper}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      type="text"
                      className={styles.textInput}
                      placeholder="Contoh: Budi Santoso"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Nomor WhatsApp / HP</label>
                  <div className={styles.inputWrapper}>
                    <Phone size={18} className={styles.inputIcon} />
                    <input
                      type="tel"
                      className={styles.textInput}
                      placeholder="0812xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>
                {activeTab === "login" ? "Email atau No. Handphone" : "Alamat Email"}
              </label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  type={activeTab === "login" ? "text" : "email"}
                  className={styles.textInput}
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Kata Sandi</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.textInput}
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {activeTab === "login" && (
              <div className={styles.formRowActions}>
                <label className={styles.rememberMe}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Ingat saya</span>
                </label>
                <Link href="/help" className={styles.forgotLink}>
                  Lupa Sandi?
                </Link>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
            >
              {isLoading ? (
                <span>Memproses...</span>
              ) : (
                <>
                  <span>{activeTab === "login" ? "Masuk Sekarang" : "Daftar Akun"}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className={styles.divider}>
            <span className={styles.dividerSpan}>atau masuk dengan</span>
          </div>

          <button
            type="button"
            className={styles.socialBtn}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                router.push("/");
              }, 800);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Lanjutkan dengan Google</span>
          </button>

          <p className={styles.authFooterText}>
            {activeTab === "login" ? (
              <>
                Belum punya akun MyShop?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2d5a43",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0
                  }}
                >
                  Daftar Sekarang
                </button>
              </>
            ) : (
              <>
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#2d5a43",
                    fontWeight: 600,
                    cursor: "pointer",
                    padding: 0
                  }}
                >
                  Masuk di sini
                </button>
              </>
            )}
          </p>

          <p className={styles.termsText}>
            Dengan masuk atau mendaftar, Anda menyetujui{" "}
            <Link href="/help">Syarat & Ketentuan</Link> serta{" "}
            <Link href="/help">Kebijakan Privasi</Link> MyShop.
          </p>
        </div>
      </div>
    </div>
  );
}
