import React from 'react';
import Link from 'next/link';
import { Coffee, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0E0604] text-[#C9AF9D] border-t border-[#C68B59]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Props Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#2C1810] mb-12">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1A0D08]/60 border border-[#C68B59]/20">
            <div className="w-12 h-12 rounded-full bg-[#2C1810] flex items-center justify-center shrink-0 text-[#C68B59]">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-[#FFFDF9] font-semibold text-sm">Specialty Grade Arabica</h4>
              <p className="text-xs text-[#9F765E] mt-0.5">Direct trade single-origin beans roasted weekly in Dubai.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1A0D08]/60 border border-[#C68B59]/20">
            <div className="w-12 h-12 rounded-full bg-[#2C1810] flex items-center justify-center shrink-0 text-[#C68B59]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-[#FFFDF9] font-semibold text-sm">Thermal Courier Delivery</h4>
              <p className="text-xs text-[#9F765E] mt-0.5">Double-walled heat-sealed insulated cups delivered fresh.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1A0D08]/60 border border-[#C68B59]/20">
            <div className="w-12 h-12 rounded-full bg-[#2C1810] flex items-center justify-center shrink-0 text-[#C68B59]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-[#FFFDF9] font-semibold text-sm">Artisan French Bakery</h4>
              <p className="text-xs text-[#9F765E] mt-0.5">Croissants & Danishes baked fresh every morning with Normandy butter.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2C1810]">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8C49A] to-[#86512A] p-[2px]">
                <div className="w-full h-full bg-[#1A0D08] rounded-full flex items-center justify-center font-serif text-[#C68B59] font-bold">
                  ☕
                </div>
              </div>
              <span className="font-serif text-lg tracking-widest text-[#FFFDF9] uppercase font-bold">
                Coffee Shop
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#9F765E]">
              Espresso, cold brews, and golden Viennoiserie crafted with passion and precision in Dubai, United Arab Emirates.
            </p>
            <div className="text-xs text-[#C68B59] font-serif">
              Prices listed in AED (United Arab Emirates Dirham)
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#FFFDF9] uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-[#C68B59] transition">Home</Link></li>
              <li><Link href="/menu" className="hover:text-[#C68B59] transition">Menu (8 Drinks & Snacks)</Link></li>
              <li><Link href="/cart" className="hover:text-[#C68B59] transition">Shopping Bag</Link></li>
              <li><Link href="/checkout" className="hover:text-[#C68B59] transition">Checkout</Link></li>
            </ul>
          </div>

          {/* Roastery locations */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#FFFDF9] uppercase mb-4">
              Dubai Roasteries
            </h3>
            <ul className="space-y-3 text-xs text-[#9F765E]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
                <span>Alserkal Avenue, Warehouse 42, Al Quoz 1, Dubai</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C68B59] shrink-0 mt-0.5" />
                <span>DIFC Gate Precinct Building 3, Dubai</span>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-[#FFFDF9] uppercase mb-4">
              Roastery Hours
            </h3>
            <ul className="space-y-2.5 text-xs text-[#9F765E]">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C68B59]" />
                <span className="text-[#F7F2EB]">+971 4 800 BREW (2739)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C68B59]" />
                <span>hello@coffeeshop.ae</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C68B59]" />
                <span>Daily 6:30 AM – 11:00 PM GST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5A3A29] gap-4">
          <p>© {new Date().getFullYear()} Coffee Shop LLC. All rights reserved. Registered in Dubai, UAE.</p>
          <p className="flex items-center gap-1.5 text-xs text-[#9F765E]">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-[#C68B59] fill-[#C68B59]" /> in Espresso, Cream & Caramel
          </p>
        </div>
      </div>
    </footer>
  );
}
