import Link from "next/link";

export function StoreFooter() {
  return (
    <footer className="mt-auto border-t bg-slate-50 py-10 text-slate-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400">
      <div className="container mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">MyShop</h3>
          <p className="text-xs leading-relaxed">
            Platform e-commerce modern dengan kemudahan transaksi belanja online yang aman, cepat, dan terpercaya.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Belanja</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/products" className="hover:underline">Semua Produk</Link></li>
            <li><Link href="/cart" className="hover:underline">Keranjang Belanja</Link></li>
            <li><Link href="/orders" className="hover:underline">Konfirmasi & Cek Resi</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Bantuan & Panduan</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/help" className="hover:underline">Pusat Bantuan (FAQ)</Link></li>
            <li><Link href="/help" className="hover:underline">Cara Transaksi</Link></li>
            <li><Link href="/help" className="hover:underline">Kebijakan Pengembalian</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Kontak Layanan</h4>
          <p className="text-xs">Email: support@myshop.local</p>
          <p className="text-xs mt-1">Senin - Minggu (08:00 - 21:00 WIB)</p>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
        &copy; 2026 MyShop. All rights reserved.
      </div>
    </footer>
  );
}
