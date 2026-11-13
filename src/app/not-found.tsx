import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        backgroundColor: "#fbfbf9"
      }}
    >
      <div
        style={{
          maxWidth: "540px",
          width: "100%",
          textAlign: "center",
          backgroundColor: "#ffffff",
          padding: "48px 32px",
          borderRadius: "20px",
          border: "1px solid #ebebe8",
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#eaf4ed",
            color: "#2d5a43",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px"
          }}
        >
          <Compass size={40} />
        </div>

        <span
          style={{
            display: "inline-block",
            fontSize: "12px",
            fontWeight: 700,
            color: "#c85a32",
            backgroundColor: "#fbf0ec",
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "12px",
            letterSpacing: "0.5px"
          }}
        >
          ERROR 404
        </span>

        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            color: "#1c1f26",
            marginBottom: "10px"
          }}
        >
          Halaman Tidak Ditemukan
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "#717680",
            lineHeight: 1.6,
            marginBottom: "28px"
          }}
        >
          Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau alamat URL yang Anda masukkan keliru.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px"
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              backgroundColor: "#2d5a43",
              color: "#ffffff",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            <Home size={16} />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              backgroundColor: "#f2f4f7",
              color: "#344054",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            <ArrowLeft size={16} />
            <span>Lihat Produk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
