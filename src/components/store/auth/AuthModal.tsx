"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, QrCode, Sparkles } from "lucide-react";
import { useAuthModalStore } from "@/store/useAuthModalStore";
import styles from "@/styles/store/auth-modal.module.css";

export function AuthModal() {
  const { isOpen, mode, closeAuthModal, setMode } = useAuthModalStore();
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Berhasil masuk sebagai ${identifier}!`);
      closeAuthModal();
    }, 800);
  };

  return (
    <div className={styles.modalOverlay} onClick={closeAuthModal}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className={styles.closeBtn}
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        {/* Header: Title + Switch mode button */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {mode === "login" ? "Masuk" : "Daftar"}
          </h2>
          <button
            type="button"
            className={styles.switchModeBtn}
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Daftar" : "Masuk"}
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className={styles.formGroup} style={{ marginBottom: "16px" }}>
              <label className={styles.label}>Nama Lengkap</label>
              <input
                type="text"
                className={styles.inputField}
                placeholder="Contoh: Budi Santoso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Nomor HP atau Email</label>
            <input
              type="text"
              className={styles.inputField}
              placeholder="Masukkan nomor HP atau email Anda"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              autoFocus
            />
          </div>

          {mode === "login" && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link
                href="/help"
                className={styles.forgotPassword}
                onClick={closeAuthModal}
              >
                Lupa kata sandi?
              </Link>
            </div>
          )}

          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={!identifier.trim() || isSubmitting}
            style={{ marginTop: mode === "register" ? "16px" : "0" }}
          >
            {isSubmitting ? "Memproses..." : "Selanjutnya"}
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerText}>atau masuk dengan</span>
        </div>

        {/* QR Code Scan Button */}
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => {
            alert("Fitur Scan QR Code segera hadir!");
          }}
        >
          <QrCode size={18} />
          <span>Scan Kode QR</span>
        </button>

        {/* Google / Metode Lain Button */}
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => {
            setIsSubmitting(true);
            setTimeout(() => {
              setIsSubmitting(false);
              alert("Login dengan Google berhasil!");
              closeAuthModal();
            }, 600);
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
          <span>Masuk dengan Google</span>
        </button>

        {/* Footer Help */}
        <div className={styles.helpFooter}>
          Butuh bantuan?{" "}
          <Link
            href="/help"
            className={styles.helpLink}
            onClick={closeAuthModal}
          >
            Hubungi Toko Care
          </Link>
        </div>
      </div>
    </div>
  );
}
