export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  imageUrl: string;
  itemCount: number;
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
  colors?: string[];
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
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Kemeja linen premium berpotongan santai, adem dan nyaman digunakan seharian di cuaca tropis.",
    colors: ["#F5F5DC", "#2B2D42", "#8D99AE"],
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
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Sneakers kanvas klasik dengan insole memory foam ekstra empuk untuk aktivitas casual harian.",
    colors: ["#FFFFFF", "#333333", "#4A5568"],
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
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Tas selempang praktis anti air dengan kompartemen gawai terorganisir dan ritsleting YKK.",
    colors: ["#1F2937", "#475569"],
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
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Headphone nirkabel dengan Active Noise Cancelling, bass bertenaga, dan ketahanan baterai hingga 40 jam.",
    colors: ["#1E1E1E", "#D4AF37", "#E2E8F0"],
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
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Kaos katun 24s gramasi tebal yang tidak menerawang, potongan boxy modern yang timeless.",
    colors: ["#F8FAFC", "#0F172A", "#64748B"],
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
      "https://images.unsplash.com/photo-1517254793699-28c11bb37d36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80",
    ],
    description: "Tumbler dengan lapisan keramik anti karat di dalam, tahan panas & dingin hingga 12 jam tanpa mengubah rasa minuman.",
    colors: ["#E2E8F0", "#CBD5E1", "#0284C7"],
  },
];

