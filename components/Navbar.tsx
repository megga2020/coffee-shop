'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Roastery Menu' },
    { href: '/cart', label: 'Cart' },
    { href: '/checkout', label: 'Checkout' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1A0D08]/95 backdrop-blur-md border-b border-[#C68B59]/30 transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-[#2C1810] text-[#EFE6DA] text-xs py-1.5 px-4 text-center border-b border-[#C68B59]/20 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
        <span>Freshly Roasted in Dubai • Free Delivery across UAE over <strong>100 AED</strong></span>
        <span className="hidden sm:inline text-[#C68B59]">|</span>
        <span className="hidden sm:inline text-[#D9A76E]">Use code <strong>CARAMEL10</strong> for 10% OFF</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E8C49A] via-[#C68B59] to-[#86512A] p-[2px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#1A0D08] rounded-full flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#C68B59]" />
            </div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#FFFDF9] uppercase flex items-center gap-1.5">
              Coffee Shop
            </div>
            <div className="text-[10px] tracking-[0.25em] text-[#C68B59] uppercase font-sans">
              Specialty Roastery • Dubai
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wider uppercase font-medium transition-colors py-1 ${
                  isActive
                    ? 'text-[#C68B59]'
                    : 'text-[#F7F2EB] hover:text-[#C68B59]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C68B59] to-transparent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Cart Button & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#2C1810] border border-[#C68B59]/40 text-[#FFFDF9] hover:border-[#C68B59] hover:bg-[#42281B] transition-all shadow-md group"
          >
            <ShoppingBag className="w-4 h-4 text-[#C68B59] group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline">
              Bag
            </span>
            <span className="bg-[#C68B59] text-[#1A0D08] font-bold text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {totalItems}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#FFFDF9] hover:text-[#C68B59] p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A0D08] border-b border-[#C68B59]/30 px-6 py-5 space-y-4 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base tracking-widest uppercase font-serif py-2 border-b border-[#2C1810] ${
                  isActive ? 'text-[#C68B59]' : 'text-[#F7F2EB]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
