export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  imageUrl: string;
  itemCount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  variant: string;
  comment: string;
  images?: string[];
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  images: string[];
  description: string;
  badge?: "Trending" | "Terlaris" | "Diskon" | "Baru";
  colors?: { name: string; hex: string }[];
  sizes?: string[];
  specifications?: { label: string; value: string }[];
  reviews?: Review[];
}

export const DUMMY_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Fashion Casual",
    slug: "fashion-casual",
    iconName: "Shirt",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80",
    itemCount: 48,
  },
  {
    id: "cat-2",
    name: "Footwear & Sneakers",
    slug: "footwear-sneakers",
    iconName: "Footprints",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80",
    itemCount: 32,
  },
  {
    id: "cat-3",
    name: "Accessories & Bags",
    slug: "accessories-bags",
    iconName: "Watch",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    itemCount: 25,
  },
  {
    id: "cat-4",
    name: "Daily Lifestyle",
    slug: "daily-lifestyle",
    iconName: "Coffee",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
    itemCount: 19,
  },
  {
    id: "cat-5",
    name: "Audio & Gadgets",
    slug: "audio-gadgets",
    iconName: "Headphones",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    itemCount: 14,
  },
  {
    id: "cat-6",
    name: "Home & Living",
    slug: "home-living",
    iconName: "Home",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
    itemCount: 28,
  },
  {
    id: "cat-7",
    name: "Office & Work Desk",
    slug: "office-work-desk",
    iconName: "Laptop",
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80",
    itemCount: 21,
  },
  {
    id: "cat-8",
    name: "Beauty & Grooming",
    slug: "beauty-grooming",
    iconName: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80",
    itemCount: 16,
  },
];

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Budi Santoso",
    rating: 5,
    date: "Kemarin, 14:20",
    variant: "Linen Cream, Size L",
    comment: "Bahan linennya beneran adem dan jatuh di badan. Jahitannya rapi banget, potongan casual santai buat ngantor atau hangout akhir pekan. Recommended seller!",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=300&q=80",
    ],
    helpfulCount: 24,
  },
  {
    id: "rev-2",
    author: "Rian Fajar Pratama",
    rating: 5,
    date: "3 hari yang lalu",
    variant: "Navy Slate, Size M",
    comment: "Ukuran M pas di badan saya (TB 173cm, BB 68kg). Warnanya sesuai foto, packing rapi dan pengirimannya cepat cuma sehari nyampe ke Tangerang.",
    helpfulCount: 16,
  },
  {
    id: "rev-3",
    author: "Aditya Pratama",
    rating: 4,
    date: "1 minggu yang lalu",
    variant: "Sage Olive, Size XL",
    comment: "Secara keseluruhan sangat bagus, bahannya halus dan nyaman. Sedikit kusut wajar khas serat alami linen, setelah disetrika uap keliatan mewah banget.",
    helpfulCount: 8,
  },
];

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Linen Relaxed Casual Shirt",
    slug: "linen-relaxed-casual-shirt",
    category: "Fashion Casual",
    price: 249000,
    discountPrice: 199000,
    rating: 4.9,
    reviewCount: 312,
    soldCount: 840,
    stock: 24,
    badge: "Terlaris",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Kemeja linen premium berpotongan santai (relaxed-fit) dibuat dari 100% serat linen alami yang sejuk dan memiliki sirkulasi udara luar biasa. Cocok dipadukan dengan celana chino atau celana pendek santai untuk aktivitas harian di cuaca tropis.",
    colors: [
      { name: "Linen Cream", hex: "#F3EBDD" },
      { name: "Navy Slate", hex: "#2B3A4A" },
      { name: "Sage Olive", hex: "#5C6F5A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    specifications: [
      { label: "Bahan", value: "100% Pure Natural Linen" },
      { label: "Fitting", value: "Relaxed Boxy Fit" },
      { label: "Kerah", value: "Camp Collar / Kerah Terbuka Kasual" },
      { label: "Kancing", value: "Natural Coconut Shell Button" },
      { label: "Perawatan", value: "Cuci air dingin, jangan gunakan pemutih klorin" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-2",
    name: "Retro Minimalist Canvas Sneakers",
    slug: "retro-minimalist-canvas-sneakers",
    category: "Footwear & Sneakers",
    price: 459000,
    discountPrice: 389000,
    rating: 4.8,
    reviewCount: 184,
    soldCount: 520,
    stock: 15,
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Sneakers kanvas klasik dengan sentuhan siluet retro modern. Dilengkapi insole Ortholite memory foam empuk yang menopang telapak kaki sepanjang hari tanpa rasa pegal.",
    colors: [
      { name: "Vintage Maroon", hex: "#800020" },
      { name: "Classic Chalk", hex: "#F5F5F0" },
      { name: "Midnight Black", hex: "#1A1A1A" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    specifications: [
      { label: "Upper", value: "12oz Organic Heavy Canvas" },
      { label: "Insole", value: "Cushioned Memory Foam" },
      { label: "Outsole", value: "Vulcanized Anti-Slip Rubber" },
      { label: "Konstruksi", value: "Strobel Stitched" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-3",
    name: "Urban Waterproof Sling Bag 6L",
    slug: "urban-waterproof-sling-bag",
    category: "Accessories & Bags",
    price: 185000,
    rating: 4.7,
    reviewCount: 95,
    soldCount: 310,
    stock: 40,
    badge: "Baru",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Tas selempang praktis anti air dengan kompartemen gawai terorganisir dan ritsleting YKK tahan cuaca.",
    colors: [
      { name: "Stealth Black", hex: "#1F2937" },
      { name: "Mineral Grey", hex: "#475569" },
    ],
    sizes: ["One Size (6 Liter)"],
    specifications: [
      { label: "Material Luar", value: "Cordura 500D Water-Repellent" },
      { label: "Ritsleting", value: "YKK AquaGuard Weatherproof" },
      { label: "Kapasitas", value: "Muat iPad / Tablet s/d 11 inch" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-4",
    name: "Wireless ANC Over-Ear Headphones",
    slug: "wireless-anc-over-ear-headphones",
    category: "Audio & Gadgets",
    price: 899000,
    discountPrice: 749000,
    rating: 4.9,
    reviewCount: 410,
    soldCount: 1100,
    stock: 12,
    badge: "Diskon",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Headphone nirkabel dengan Active Noise Cancelling cerdas, driver audio 40mm bass bertenaga, dan ketahanan baterai hingga 40 jam.",
    colors: [
      { name: "Matte Charcoal", hex: "#1E1E1E" },
      { name: "Silver Ash", hex: "#D1D5DB" },
    ],
    sizes: ["Universal Adjustable"],
    specifications: [
      { label: "Driver", value: "40mm Dynamic Neodymium" },
      { label: "Baterai", value: "40 Jam (ANC On)" },
      { label: "Koneksi", value: "Bluetooth 5.3 + Aux 3.5mm" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-5",
    name: "Oversized Heavyweight Cotton Tee",
    slug: "oversized-heavyweight-cotton-tee",
    category: "Fashion Casual",
    price: 139000,
    rating: 4.8,
    reviewCount: 520,
    soldCount: 2400,
    stock: 80,
    badge: "Terlaris",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Kaos katun 24s gramasi tebal yang tidak menerawang, potongan boxy modern yang timeless.",
    colors: [
      { name: "Off-White", hex: "#F8FAFC" },
      { name: "Charcoal", hex: "#0F172A" },
      { name: "Sage", hex: "#64748B" },
    ],
    sizes: ["S", "M", "L", "XL"],
    specifications: [
      { label: "Material", value: "100% Combed Cotton 24s (210 gsm)" },
      { label: "Potongan", value: "Boxy Oversized" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-6",
    name: "Ceramic Insulated Travel Tumbler 500ml",
    slug: "ceramic-insulated-travel-tumbler",
    category: "Daily Lifestyle",
    price: 165000,
    discountPrice: 135000,
    rating: 4.9,
    reviewCount: 88,
    soldCount: 290,
    stock: 35,
    badge: "Diskon",
    images: [
      "https://images.unsplash.com/photo-1570784332176-fdd73da66f03?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517254793699-28c11bb37d36?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Tumbler dengan lapisan keramik anti karat di dalam, tahan panas & dingin hingga 12 jam tanpa mengubah rasa minuman murni.",
    colors: [
      { name: "Chalk White", hex: "#F3F4F6" },
      { name: "Forest Green", hex: "#2D5A43" },
    ],
    sizes: ["500 ml"],
    specifications: [
      { label: "Insulasi", value: "Double Wall Vacuum Insulation" },
      { label: "Lapisan Dalam", value: "TrueTaste Ceramic Coating" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-7",
    name: "Pleated Relaxed Daily Chino Pants",
    slug: "pleated-relaxed-daily-chino-pants",
    category: "Fashion Casual",
    price: 279000,
    discountPrice: 229000,
    rating: 4.8,
    reviewCount: 145,
    soldCount: 680,
    stock: 20,
    badge: "Terlaris",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Celana chino berpotongan santai dengan lipit ganda dan pinggang elastis samping.",
    colors: [
      { name: "Sand Khaki", hex: "#C2B280" },
      { name: "Dark Navy", hex: "#2B2D42" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    specifications: [
      { label: "Bahan", value: "Cotton Twill Stretch 98% Cotton 2% Spandex" },
      { label: "Fit", value: "Relaxed Tapered" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-8",
    name: "Minimalist Leather Cardholder Wallet",
    slug: "minimalist-leather-cardholder-wallet",
    category: "Accessories & Bags",
    price: 119000,
    rating: 4.9,
    reviewCount: 230,
    soldCount: 950,
    stock: 45,
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Dompet kartu kulit asli ramping berkapasitas 8 kartu dengan slot uang lipat tengah.",
    colors: [
      { name: "Tan Brown", hex: "#8B4513" },
      { name: "Jet Black", hex: "#1A1A1A" },
    ],
    sizes: ["Slim 8-Card"],
    specifications: [
      { label: "Material", value: "Full-Grain Genuine Cowhide Leather" },
      { label: "Fitur", value: "RFID Blocking Layer" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-9",
    name: "Aroma Diffuser & Night Lamp Ceramic",
    slug: "aroma-diffuser-night-lamp-ceramic",
    category: "Home & Living",
    price: 219000,
    discountPrice: 179000,
    rating: 4.8,
    reviewCount: 92,
    soldCount: 340,
    stock: 18,
    badge: "Diskon",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Diffuser ultrasonik dengan bodi keramik bertekstur alami dan cahaya hangat relaksasi.",
    colors: [{ name: "Sand Ceramic", hex: "#F5F5F0" }],
    sizes: ["250 ml"],
    specifications: [
      { label: "Kapasitas Air", value: "250 ml (Hingga 8 Jam)" },
      { label: "Fitur", value: "Auto Shut-Off, 2 Mode Lampu Hangat" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-10",
    name: "Cork & Felt Desk Mat 80x40cm",
    slug: "cork-felt-desk-mat",
    category: "Office & Work Desk",
    price: 149000,
    rating: 4.7,
    reviewCount: 160,
    soldCount: 720,
    stock: 30,
    badge: "Baru",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Alas meja kerja dua sisi material gabus alami dan wol felt halus melindungi meja dari goresan.",
    colors: [{ name: "Natural Cork & Grey", hex: "#3E2723" }],
    sizes: ["80 x 40 cm"],
    specifications: [
      { label: "Dimensi", value: "80 cm x 40 cm x 3 mm" },
      { label: "Material", value: "Eco-Friendly Cork + Wool Felt" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-11",
    name: "Classic Acetate Polarized Sunglasses",
    slug: "classic-acetate-polarized-sunglasses",
    category: "Accessories & Bags",
    price: 235000,
    discountPrice: 189000,
    rating: 4.8,
    reviewCount: 110,
    soldCount: 460,
    stock: 22,
    badge: "Diskon",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Kacamata hitam frame asetat kuat dengan lensa polarized anti-silau UV400.",
    colors: [
      { name: "Tortoise Brown", hex: "#78350F" },
      { name: "Glossy Black", hex: "#1C1917" },
    ],
    sizes: ["Medium Standard"],
    specifications: [
      { label: "Lensa", value: "TAC Polarized UV400" },
      { label: "Frame", value: "Handcrafted Bio-Acetate" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
  {
    id: "prod-12",
    name: "Waffle Knit Longsleeve Lounge Shirt",
    slug: "waffle-knit-longsleeve-lounge-shirt",
    category: "Fashion Casual",
    price: 189000,
    rating: 4.9,
    reviewCount: 305,
    soldCount: 1250,
    stock: 50,
    badge: "Terlaris",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=80",
    ],
    description: "Baju lengan panjang rajut wafel katun lembut dan fleksibel untuk santai di rumah maupun jalan sore.",
    colors: [
      { name: "Oatmeal Grey", hex: "#E7E5E4" },
      { name: "Dark Slate", hex: "#1E293B" },
      { name: "Pine Green", hex: "#15803D" },
    ],
    sizes: ["S", "M", "L", "XL"],
    specifications: [
      { label: "Bahan", value: "100% Heavy Waffle Cotton" },
      { label: "Fit", value: "Regular Relaxed" },
    ],
    reviews: SAMPLE_REVIEWS,
  },
];
