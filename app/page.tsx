'use client';

import React from 'react';
import Link from 'next/link';
import { COFFEE_ITEMS } from '@/data/items';
import CoffeeCard from '@/components/CoffeeCard';
import { Coffee, ArrowRight, Award, Clock, ShieldCheck, Star, Sparkles } from 'lucide-react';

export default function HomePage() {
  const featured = COFFEE_ITEMS.slice(0, 4);

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1A0D08] via-[#2C1810] to-[#0E0604] px-4 sm:px-6 lg:px-8 py-20 border-b border-[#C68B59]/20">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#C68B59]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#5A3A29]/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C1810]/80 border border-[#C68B59]/40 text-[#C68B59] text-xs font-semibold tracking-widest uppercase shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dubai’s Premier Specialty Coffee Roastery</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFDF9] leading-[1.15]">
              Small-Batch Roasting,{' '}
              <span className="block bg-gradient-to-r from-[#FAF0E4] via-[#D9A76E] to-[#C68B59] bg-clip-text text-transparent">
                Caramel Velvet Crema.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#EFE6DA] leading-relaxed font-light">
              Single-origin Ethiopian Yirgacheffe, Spanish caramel lattes, cold brew americanos, and flaky French butter croissants. Handcrafted daily with prices in AED.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] font-serif font-bold text-base tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#C68B59]/20 flex items-center justify-center gap-2 group"
            >
              <span>Explore Roastery Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/cart"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#2C1810] border border-[#C68B59]/50 text-[#FFFDF9] font-serif font-semibold text-base tracking-wider uppercase hover:bg-[#42281B] hover:border-[#C68B59] transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>View Shopping Bag</span>
            </Link>
          </div>

          {/* UAE Badges Strip */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center max-w-3xl mx-auto border-t border-[#2C1810]">
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#C68B59] block">8</span>
              <span className="text-xs text-[#9F765E] uppercase tracking-wider">Drinks & Pastries</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#C68B59] block">AED</span>
              <span className="text-xs text-[#9F765E] uppercase tracking-wider">Local UAE Dirhams</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#C68B59] block">45 Mins</span>
              <span className="text-xs text-[#9F765E] uppercase tracking-wider">Thermal Express Courier</span>
            </div>
            <div className="p-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#C68B59] block">100%</span>
              <span className="text-xs text-[#9F765E] uppercase tracking-wider">Arabica & Pure Butter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Confections Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C68B59] font-semibold mb-2">
              <Award className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFDF9]">
              Signature Brews & Bakery
            </h2>
            <p className="text-sm text-[#9F765E] mt-1">
              Sample our highest-rated roasts and oven-fresh French viennoiserie.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[#C68B59] hover:text-[#FAF0E4] transition group"
          >
            <span>View All 8 Creations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((item) => (
            <CoffeeCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Spotlight: Spanish Caramel Latte & Iced Pistachio */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#3B2219] via-[#2C1810] to-[#1A0D08] border border-[#C68B59]/40 p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C68B59]/20 border border-[#C68B59]/50 text-[#C68B59] text-xs font-bold uppercase tracking-widest">
                House Specialties
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFFDF9] leading-tight">
                Spanish Caramel Latte & Pistachio Cold Brew
              </h2>
              <p className="text-[#EFE6DA] text-sm sm:text-base leading-relaxed">
                Extracted from single-origin beans roasted right here in Al Quoz, paired with rich dulce de leche, sea-salted caramel drizzle, and velvety frothed milk.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-[#1A0D08]/70 p-4 rounded-xl border border-[#C68B59]/20">
                  <span className="text-xs text-[#9F765E] uppercase tracking-wider block">Caramel Spanish Latte</span>
                  <span className="font-serif text-2xl font-bold text-[#C68B59]">28 AED</span>
                </div>
                <div className="bg-[#1A0D08]/70 p-4 rounded-xl border border-[#C68B59]/20">
                  <span className="text-xs text-[#9F765E] uppercase tracking-wider block">Iced Pistachio Latte</span>
                  <span className="font-serif text-2xl font-bold text-[#C68B59]">32 AED</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] font-semibold text-sm tracking-wider uppercase hover:brightness-110 active:scale-95 transition shadow-lg"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#C68B59]/30 shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1000&q=80"
                alt="Spanish Caramel Latte"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D08]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#1A0D08]/85 backdrop-blur-md border border-[#C68B59]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#C68B59] uppercase font-bold tracking-wider">Dubai Favorite</span>
                  <p className="text-sm font-serif font-bold text-white">Caramel Spanish Latte</p>
                </div>
                <span className="font-serif text-lg font-bold text-[#C68B59]">28 AED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cream Card: The Roastery Standard */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7F2EB] text-[#1A0D08] rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-[#C68B59] shadow-2xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold tracking-[0.25em] text-[#86512A] uppercase">
              The Artisan Roastery Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A0D08]">
              Espresso, Cream & Caramel: Pure Harmonic Balance
            </h2>
            <p className="text-sm text-[#5A3A29] leading-relaxed">
              Every cup is calibrated to 9 bars of pressure with fresh micro-foamed dairy and hand-simmered caramel glazes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#DFD3C3] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#2C1810] text-[#C68B59] flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A0D08] mb-2">
                Ethical Specialty Arabica
              </h3>
              <p className="text-xs text-[#5A3A29] leading-relaxed">
                Directly traded beans from high-altitude farms in Ethiopia, Colombia, and Brazil scored 86+ on SCA.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#DFD3C3] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#2C1810] text-[#C68B59] flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A0D08] mb-2">
                Handcrafted Salted Caramel
              </h3>
              <p className="text-xs text-[#5A3A29] leading-relaxed">
                Made in small batches using pure cane sugar, Normandy butter, and French sea salt crystals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFDF9] border border-[#DFD3C3] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#2C1810] text-[#C68B59] flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A0D08] mb-2">
                72-Hour Laminated Pastries
              </h3>
              <p className="text-xs text-[#5A3A29] leading-relaxed">
                Slow cold-fermented French Viennoiserie baked fresh before dawn for unmatched golden flakiness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials in UAE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C68B59] font-semibold">
            Coffee Aficionado Reviews
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#FFFDF9]">
            Beloved Across Dubai & Abu Dhabi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#2C1810] p-6 rounded-2xl border border-[#C68B59]/25 space-y-4">
            <div className="flex gap-1 text-[#C68B59]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C68B59]" />
              ))}
            </div>
            <p className="text-xs text-[#EFE6DA] italic leading-relaxed">
              &quot;The Salted Caramel Spanish Latte is exceptional. The balance between bold espresso and rich caramel is perfection.&quot;
            </p>
            <div>
              <p className="font-serif text-sm font-bold text-[#FFFDF9]">Hamdan Al-Maktoum</p>
              <p className="text-[11px] text-[#9F765E]">DIFC, Dubai</p>
            </div>
          </div>

          <div className="bg-[#2C1810] p-6 rounded-2xl border border-[#C68B59]/25 space-y-4">
            <div className="flex gap-1 text-[#C68B59]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C68B59]" />
              ))}
            </div>
            <p className="text-xs text-[#EFE6DA] italic leading-relaxed">
              &quot;Arrived steaming hot in thermal packaging. The croissant was still warm and crisp, paired with a textbook flat white.&quot;
            </p>
            <div>
              <p className="font-serif text-sm font-bold text-[#FFFDF9]">Noura & Khalid</p>
              <p className="text-[11px] text-[#9F765E]">Jumeirah 1, Dubai</p>
            </div>
          </div>

          <div className="bg-[#2C1810] p-6 rounded-2xl border border-[#C68B59]/25 space-y-4">
            <div className="flex gap-1 text-[#C68B59]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C68B59]" />
              ))}
            </div>
            <p className="text-xs text-[#EFE6DA] italic leading-relaxed">
              &quot;The Iced Pistachio Latte is a Dubai staple done right. Real roasted pistachio cream instead of artificial syrups.&quot;
            </p>
            <div>
              <p className="font-serif text-sm font-bold text-[#FFFDF9]">Omar Al-Zaabi</p>
              <p className="text-[11px] text-[#9F765E]">Al Bateen, Abu Dhabi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-[#2C1810] via-[#3B2219] to-[#2C1810] p-10 sm:p-14 rounded-3xl border border-[#C68B59]/50 shadow-2xl space-y-6">
          <Coffee className="w-8 h-8 text-[#C68B59] mx-auto" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFDF9]">
            Craving Freshly Pulled Specialty Coffee?
          </h2>
          <p className="text-sm text-[#EFE6DA] max-w-xl mx-auto">
            Order your morning brew and fresh bakery items. Thermal courier dispatch in under 45 minutes across Dubai and the Emirates.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] font-serif font-bold text-sm tracking-wider uppercase hover:brightness-110 active:scale-95 transition shadow-xl"
            >
              <span>Explore All 8 Drinks & Snacks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
