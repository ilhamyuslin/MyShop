# Dokumentasi Skema & Relasi Data (MyShop)

Dokumen ini mencatat seluruh entitas data, tipe field, dan relasi data yang digunakan pada UI / Frontend MyShop. Setiap data dummy yang ada pada mockup UI mengacu pada blueprint ini agar memudahkan implementasi database (PostgreSQL / Supabase & Prisma) nantinya.

---

## 1. Diagram Relasi Entitas (ERD Overview)

```
[ User ] (Pelanggan / Admin)
   │
   ├──< [ Order ] (Transaksi Belanja)
   │        │
   │        └──< [ OrderItem ] >── [ Product ] (Katalog Produk)
   │                                   │
   │                                   └── [ Category ] (Kategori)
   │
   ├──< [ Review ] >────────────────── [ Product ]
   │
   └──< [ HelpTicket ] (Pusat Bantuan / CS)
```

---

## 2. Definisi Entitas & Field

### A. User (Pengguna)
Menyimpan identitas pelanggan dan admin.
* `id` : String (CUID / UUID) - **Primary Key**
* `email` : String - Unique
* `name` : String
* `phone` : String (opsional, untuk konfirmasi pengiriman & OTP)
* `avatarUrl` : String (URL gambar profil)
* `role` : Enum (`CUSTOMER`, `ADMIN`) - Default: `CUSTOMER`
* `addresses` : Relasi ke tabel alamat (alamat utama pengiriman)
* `createdAt` : DateTime
* `updatedAt` : DateTime

### B. Category (Kategori Produk)
Pengelompokan etalase barang (misal: Fashion, Gadget, Lifestyle, Footwear).
* `id` : String - **Primary Key**
* `name` : String
* `slug` : String - Unique
* `icon` : String (nama icon Lucide atau URL SVG)
* `imageUrl` : String (gambar thumbnail banner kategori)
* `itemCount` : Int (jumlah produk di kategori ini)

### C. Product (Katalog Produk)
Informasi detail setiap barang yang dijual.
* `id` : String - **Primary Key**
* `name` : String (contoh: "Casual Oversized Linen Shirt")
* `slug` : String - Unique
* `description` : String (markdown / text)
* `price` : Decimal / Number (harga normal)
* `discountPrice` : Decimal / Number (opsional, harga diskon coret)
* `stock` : Int (jumlah stok tersedia)
* `categoryId` : String - **Foreign Key** $\rightarrow$ `Category.id`
* `images` : Array of String (URL foto produk, foto utama di index 0)
* `rating` : Float (contoh: 4.8)
* `reviewCount` : Int (contoh: 124)
* `soldCount` : Int (contoh: 450 terjual)
* `tags` : Array of String (misal: `["Bestseller", "New", "Sale"]`)
* `isPublished` : Boolean - Default: `true`
* `createdAt` : DateTime
* `updatedAt` : DateTime

### D. Cart & CartItem (Keranjang Belanja)
Dikelola di sisi Client (Zustand + LocalStorage) untuk tamu, dan dapat disinkronkan ke DB saat user login.
* `productId` : String $\rightarrow$ `Product.id`
* `quantity` : Int
* `selectedVariant` : String (opsional: Ukuran "L", Warna "Oatmeal")

### E. Order (Transaksi & Pembayaran)
Mencatat pesanan yang dilakukan oleh customer.
* `id` : String - **Primary Key** (contoh format: `ORD-2026-XXXX`)
* `userId` : String (opsional jika guest checkout) $\rightarrow$ `User.id`
* `totalAmount` : Decimal (total belanja + ongkir - voucher)
* `subtotal` : Decimal (harga barang murni)
* `shippingCost` : Decimal (biaya kurir)
* `status` : Enum:
  - `PENDING` (Menunggu pembayaran)
  - `PAID` (Pembayaran diterima)
  - `PROCESSING` (Sedang dikemas penjual)
  - `SHIPPED` (Dalam pengiriman ekspedisi)
  - `DELIVERED` (Pesanan selesai diterima)
  - `CANCELLED` (Batal)
* `shippingCourier` : String (contoh: "JNE Regular", "SiCepat", "GoSend")
* `shippingTrackingNumber` : String (Nomor Resi pengiriman)
* `paymentMethod` : String (QRIS, BCA VA, Mandiri VA, GoPay, dll.)
* `paymentGatewayId` : String (Transaction ID dari Midtrans/Xendit)
* `shippingAddress` : JSON / Text (Penerima, Telepon, Alamat lengkap, Kota, Kode Pos)
* `createdAt` : DateTime
* `updatedAt` : DateTime

### F. OrderItem (Detail Barang Per Pesanan)
* `id` : String - **Primary Key**
* `orderId` : String $\rightarrow$ `Order.id`
* `productId` : String $\rightarrow$ `Product.id`
* `quantity` : Int
* `unitPrice` : Decimal (harga saat checkout terjadi, tahan perubahan harga di katalog)

### G. HelpTicket & FAQ (Pusat Bantuan)
Untuk interaksi user kendala transaksi / FAQ.
* `id` : String - **Primary Key**
* `userId` : String $\rightarrow$ `User.id`
* `orderId` : String (opsional jika komplain terkait order spesifik)
* `subject` : String
* `category` : Enum (`PAYMENT_ISSUE`, `SHIPPING_DELAY`, `RETURN_REFUND`, `GENERAL`)
* `status` : Enum (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`)
* `messages` : Array percakapan antara customer dan admin/CS

