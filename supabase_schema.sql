-- ==========================================================
-- SUPABASE SQL SETUP FOR "coffee-shop"
-- 1. Create 'menu_items' table & seed 8 specialty drinks & snacks
-- 2. Create 'orders' table for checkout saves
-- ==========================================================

-- 1. MENU_ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.menu_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    arabic_name TEXT,
    category TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    price_aed NUMERIC NOT NULL,
    roast_level TEXT,
    badge TEXT,
    rating NUMERIC DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    image TEXT,
    origin TEXT,
    notes TEXT[] DEFAULT '{}',
    calories TEXT,
    temperature TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and allow public read access
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to menu_items" ON public.menu_items;
CREATE POLICY "Allow public read access to menu_items"
    ON public.menu_items FOR SELECT
    USING (true);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    emirate TEXT NOT NULL,
    address TEXT NOT NULL,
    delivery_time TEXT,
    special_instructions TEXT,
    payment_method TEXT NOT NULL,
    items JSONB NOT NULL,
    subtotal_aed NUMERIC NOT NULL,
    delivery_fee_aed NUMERIC NOT NULL,
    discount_aed NUMERIC DEFAULT 0,
    total_aed NUMERIC NOT NULL,
    status TEXT DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS and allow public insert & read
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to orders" ON public.orders;
CREATE POLICY "Allow public insert to orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read orders" ON public.orders;
CREATE POLICY "Allow public read orders"
    ON public.orders FOR SELECT
    USING (true);

-- ==========================================================
-- SEED DATA: 8 SAMPLE COFFEE & BAKERY ITEMS IN AED
-- ==========================================================
INSERT INTO public.menu_items (id, name, arabic_name, category, tagline, description, price_aed, roast_level, badge, rating, reviews_count, image, origin, notes, calories, temperature)
VALUES 
(
    'double-espresso',
    'Single-Origin Double Espresso',
    'دبل إسبريسو سنغل أوريجين',
    'Hot Specialty',
    'High-altitude Ethiopian Yirgacheffe with golden crema',
    'Pure, intense extraction pulled at 9 bars of pressure. Rich dark cocoa aromatics, crisp citrus bergamot notes, and a thick golden tiger-stripe crema.',
    18,
    'Medium Roast',
    'Roaster’s Choice',
    4.9,
    164,
    'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    'Yirgacheffe, Ethiopia (Altitude 2,100m)',
    ARRAY['Dark Cocoa', 'Bergamot', 'Stone Fruit'],
    '5 kcal',
    'Hot'
),
(
    'caramel-spanish-latte',
    'Signature Salted Caramel Spanish Latte',
    'سبانش لاتيه بالكراميل المملح',
    'Hot Specialty',
    'Double shot espresso, dulce de leche & sea salt caramel drizzle',
    'Our #1 best-selling drink. Bold specialty espresso balanced with caramelized condensed milk, silky micro-foamed milk, and house-made Fleur de Sel amber caramel.',
    28,
    'Medium Roast',
    'Bestseller',
    5.0,
    310,
    'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    'Antioquia Colombia & Organic Dairy',
    ARRAY['Dulce de Leche', 'Brown Sugar', 'Sea Salt'],
    '210 kcal',
    'Hot'
),
(
    'velvet-flat-white',
    'Velvet Flat White',
    'فلات وايت مخملي',
    'Hot Specialty',
    'Double ristretto with glossy microfoam & caramel latte art',
    'Two sweet, concentrated ristretto shots seamlessly blended with velvety textured whole milk, finished with an elegant rosetta latte art pour.',
    24,
    'Medium Roast',
    'Barista Favorite',
    4.8,
    142,
    'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    'Minas Gerais, Brazil',
    ARRAY['Toasted Hazelnut', 'Caramel', 'Malted Milk'],
    '140 kcal',
    'Hot'
),
(
    'artisan-cappuccino',
    'Classic Artisan Cappuccino',
    'كابتشينو كلاسيك أرتيزان',
    'Hot Specialty',
    'Silky steamed foam dusted with roasted cocoa nibs',
    'An authentic Italian ratio of intense espresso, steamed milk, and a dense, cloud-like foam pillow dusted with Belgian cocoa powder.',
    22,
    'Dark Roast',
    'Classic',
    4.8,
    188,
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    'Huehuetenango, Guatemala',
    ARRAY['Dark Chocolate', 'Cinnamon', 'Vanilla'],
    '120 kcal',
    'Hot'
),
(
    'iced-americano-coldbrew',
    '18-Hour Cold Brew Iced Americano',
    'آيسد أمريكانو كولد برو 18 ساعة',
    'Cold Brews',
    'Slow-steeped over crystal clear ice with crisp caramel finish',
    'Coarsely ground Colombian beans steeped in chilled alpine water for 18 hours. Ultra-smooth, low acidity, naturally sweet, poured over artisanal ice cubes.',
    20,
    'Medium Roast',
    'Zero Sugar',
    4.9,
    175,
    'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    'Huila, Colombia',
    ARRAY['Black Cherry', 'Dark Toffee', 'Clean Citrus'],
    '5 kcal',
    'Iced'
),
(
    'iced-pistachio-latte',
    'Iced Pistachio Spanish Latte',
    'آيسد بستاشيو سبانش لاتيه',
    'Cold Brews',
    'Roasted Iranian pistachio cream, chilled milk & double espresso',
    'Dubai’s iconic specialty iced drink. Layered roasted pistachio butter, sweetened condensed cream, chilled milk, and a bold espresso float topped with crushed pistachios.',
    32,
    'Medium Roast',
    'Dubai Special',
    5.0,
    420,
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    'House Blend & Kerman Pistachios',
    ARRAY['Roasted Pistachio', 'Sweet Cream', 'Espresso'],
    '280 kcal',
    'Iced'
),
(
    'french-butter-croissant',
    'Golden Butter French Croissant',
    'كرواسون الزبدة الفرنسية الذهبي',
    'Artisan Bakery',
    'Baked fresh daily with 100% Normandy cultured butter',
    'Flaky, honeycombed interior with a delicate crisp golden exterior. Made using traditional 72-hour cold-fermented dough and French AOP Charentes butter.',
    16,
    'Fresh Baked',
    'Fresh Daily',
    4.9,
    215,
    'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    'Normandy AOP Butter & French Wheat',
    ARRAY['Cultured Butter', 'Caramelized Crust', 'Flaky'],
    '260 kcal',
    'Warm'
),
(
    'caramel-pecan-danish',
    'Salted Caramel Pecan Danish',
    'دانيش البقان والكراميل المملح',
    'Artisan Bakery',
    'Crisp puff pastry, Bourbon vanilla custard & glazed pecans',
    'Golden flaky spiral pastry loaded with slow-cooked vanilla bean custard, crowned with roasted Georgia pecans and drizzled with warm sea-salt amber caramel.',
    22,
    'Fresh Baked',
    'Chef''s Signature',
    5.0,
    198,
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    'Madagascan Vanilla & Georgia Pecans',
    ARRAY['Salted Caramel', 'Pecan Crunch', 'Vanilla Custard'],
    '340 kcal',
    'Warm'
)
ON CONFLICT (id) DO UPDATE 
SET 
    name = EXCLUDED.name,
    price_aed = EXCLUDED.price_aed,
    description = EXCLUDED.description;
