export interface CoffeeItem {
  id: string;
  name: string;
  arabicName: string;
  category: 'Hot Specialty' | 'Cold Brews' | 'Artisan Bakery';
  tagline: string;
  description: string;
  priceAED: number;
  roastLevel?: 'Light Roast' | 'Medium Roast' | 'Dark Roast' | 'Fresh Baked';
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  origin?: string;
  notes?: string[];
  calories?: string;
  temperature?: 'Hot' | 'Iced' | 'Warm';
}

export const COFFEE_ITEMS: CoffeeItem[] = [
  {
    id: "double-espresso",
    name: "Single-Origin Double Espresso",
    arabicName: "دبل إسبريسو سنغل أوريجين",
    category: "Hot Specialty",
    tagline: "High-altitude Ethiopian Yirgacheffe with golden crema",
    description: "Pure, intense extraction pulled at 9 bars of pressure. Rich dark cocoa aromatics, crisp citrus bergamot notes, and a thick golden tiger-stripe crema.",
    priceAED: 18,
    roastLevel: "Medium Roast",
    badge: "Roaster’s Choice",
    rating: 4.9,
    reviewsCount: 164,
    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
    origin: "Yirgacheffe, Ethiopia (Altitude 2,100m)",
    notes: ["Dark Cocoa", "Bergamot", "Stone Fruit"],
    calories: "5 kcal",
    temperature: "Hot"
  },
  {
    id: "caramel-spanish-latte",
    name: "Signature Salted Caramel Spanish Latte",
    arabicName: "سبانش لاتيه بالكراميل المملح",
    category: "Hot Specialty",
    tagline: "Double shot espresso, dulce de leche & sea salt caramel drizzle",
    description: "Our #1 best-selling drink. Bold specialty espresso balanced with caramelized condensed milk, silky micro-foamed milk, and house-made Fleur de Sel amber caramel.",
    priceAED: 28,
    roastLevel: "Medium Roast",
    badge: "Bestseller",
    rating: 5.0,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80",
    origin: "Antioquia Colombia & Organic Dairy",
    notes: ["Dulce de Leche", "Brown Sugar", "Sea Salt"],
    calories: "210 kcal",
    temperature: "Hot"
  },
  {
    id: "velvet-flat-white",
    name: "Velvet Flat White",
    arabicName: "فلات وايت مخملي",
    category: "Hot Specialty",
    tagline: "Double ristretto with glossy microfoam & caramel latte art",
    description: "Two sweet, concentrated ristretto shots seamlessly blended with velvety textured whole milk, finished with an elegant rosetta latte art pour.",
    priceAED: 24,
    roastLevel: "Medium Roast",
    badge: "Barista Favorite",
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80",
    origin: "Minas Gerais, Brazil",
    notes: ["Toasted Hazelnut", "Caramel", "Malted Milk"],
    calories: "140 kcal",
    temperature: "Hot"
  },
  {
    id: "artisan-cappuccino",
    name: "Classic Artisan Cappuccino",
    arabicName: "كابتشينو كلاسيك أرتيزان",
    category: "Hot Specialty",
    tagline: "Silky steamed foam dusted with roasted cocoa nibs",
    description: "An authentic Italian ratio of intense espresso, steamed milk, and a dense, cloud-like foam pillow dusted with Belgian cocoa powder.",
    priceAED: 22,
    roastLevel: "Dark Roast",
    badge: "Classic",
    rating: 4.8,
    reviewsCount: 188,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    origin: "Huehuetenango, Guatemala",
    notes: ["Dark Chocolate", "Cinnamon", "Vanilla"],
    calories: "120 kcal",
    temperature: "Hot"
  },
  {
    id: "iced-americano-coldbrew",
    name: "18-Hour Cold Brew Iced Americano",
    arabicName: "آيسد أمريكانو كولد برو 18 ساعة",
    category: "Cold Brews",
    tagline: "Slow-steeped over crystal clear ice with crisp caramel finish",
    description: "Coarsely ground Colombian beans steeped in chilled alpine water for 18 hours. Ultra-smooth, low acidity, naturally sweet, poured over artisanal ice cubes.",
    priceAED: 20,
    roastLevel: "Medium Roast",
    badge: "Zero Sugar",
    rating: 4.9,
    reviewsCount: 175,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
    origin: "Huila, Colombia",
    notes: ["Black Cherry", "Dark Toffee", "Clean Citrus"],
    calories: "5 kcal",
    temperature: "Iced"
  },
  {
    id: "iced-pistachio-latte",
    name: "Iced Pistachio Spanish Latte",
    arabicName: "آيسد بستاشيو سبانش لاتيه",
    category: "Cold Brews",
    tagline: "Roasted Iranian pistachio cream, chilled milk & double espresso",
    description: "Dubai’s iconic specialty iced drink. Layered roasted pistachio butter, sweetened condensed cream, chilled milk, and a bold espresso float topped with crushed pistachios.",
    priceAED: 32,
    roastLevel: "Medium Roast",
    badge: "Dubai Special",
    rating: 5.0,
    reviewsCount: 420,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80",
    origin: "House Blend & Kerman Pistachios",
    notes: ["Roasted Pistachio", "Sweet Cream", "Espresso"],
    calories: "280 kcal",
    temperature: "Iced"
  },
  {
    id: "french-butter-croissant",
    name: "Golden Butter French Croissant",
    arabicName: "كرواسون الزبدة الفرنسية الذهبي",
    category: "Artisan Bakery",
    tagline: "Baked fresh daily with 100% Normandy cultured butter",
    description: "Flaky, honeycombed interior with a delicate crisp golden exterior. Made using traditional 72-hour cold-fermented dough and French AOP Charentes butter.",
    priceAED: 16,
    roastLevel: "Fresh Baked",
    badge: "Fresh Daily",
    rating: 4.9,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
    origin: "Normandy AOP Butter & French Wheat",
    notes: ["Cultured Butter", "Caramelized Crust", "Flaky"],
    calories: "260 kcal",
    temperature: "Warm"
  },
  {
    id: "caramel-pecan-danish",
    name: "Salted Caramel Pecan Danish",
    arabicName: "دانيش البقان والكراميل المملح",
    category: "Artisan Bakery",
    tagline: "Crisp puff pastry, Bourbon vanilla custard & glazed pecans",
    description: "Golden flaky spiral pastry loaded with slow-cooked vanilla bean custard, crowned with roasted Georgia pecans and drizzled with warm sea-salt amber caramel.",
    priceAED: 22,
    roastLevel: "Fresh Baked",
    badge: "Chef's Signature",
    rating: 5.0,
    reviewsCount: 198,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    origin: "Madagascan Vanilla & Georgia Pecans",
    notes: ["Salted Caramel", "Pecan Crunch", "Vanilla Custard"],
    calories: "340 kcal",
    temperature: "Warm"
  }
];
