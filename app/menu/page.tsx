'use client';

import React, { useState, useEffect } from 'react';
import { COFFEE_ITEMS, CoffeeItem } from '@/data/items';
import CoffeeCard from '@/components/CoffeeCard';
import { supabase } from '@/lib/supabase';
import { Coffee, Sparkles, SlidersHorizontal, Search, Database } from 'lucide-react';
import Link from 'next/link';

export default function MenuPage() {
  const [items, setItems] = useState<CoffeeItem[]>(COFFEE_ITEMS);
  const [loading, setLoading] = useState(true);
  const [isFromSupabase, setIsFromSupabase] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');

  const categories = ['All', 'Hot Specialty', 'Cold Brews', 'Artisan Bakery'];

  // Load menu from Supabase 'menu_items' table
  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('menu_items')
          .select('*')
          .order('price_aed', { ascending: false });

        if (error) {
          console.warn('Supabase menu_items notice (fallback to local data):', error.message);
        } else if (data && data.length > 0) {
          const mapped: CoffeeItem[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            arabicName: item.arabic_name || '',
            category: item.category,
            tagline: item.tagline || '',
            description: item.description || '',
            priceAED: Number(item.price_aed),
            roastLevel: item.roast_level,
            badge: item.badge,
            rating: Number(item.rating) || 5.0,
            reviewsCount: item.reviews_count || 0,
            image: item.image,
            origin: item.origin || '',
            notes: item.notes || [],
            calories: item.calories || '',
            temperature: item.temperature,
          }));
          setItems(mapped);
          setIsFromSupabase(true);
        }
      } catch (err) {
        console.error('Error fetching menu_items from Supabase:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  // Filter logic
  let filtered = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.arabicName.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Sort logic
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.priceAED - b.priceAED);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.priceAED - a.priceAED);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C1810] border border-[#C68B59]/30 text-[#C68B59] text-xs font-semibold uppercase tracking-widest">
          {isFromSupabase ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Loaded Live from Supabase &apos;menu_items&apos;</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5" />
              <span>Specialty Roastery Collection</span>
            </span>
          )}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FFFDF9]">
          The Roastery & Bakery Menu
        </h1>
        <p className="text-sm sm:text-base text-[#EFE6DA] leading-relaxed">
          Crafted fresh daily with espresso, cream, and caramel. Single-origin Arabica extractions and French Viennoiserie baked before dawn in Dubai.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#2C1810] p-4 sm:p-6 rounded-2xl border border-[#C68B59]/30 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9F765E]" />
            <input
              type="text"
              placeholder="Search drinks, beans or pastries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A0D08] border border-[#42281B] rounded-xl text-xs text-[#FFFDF9] placeholder-[#77513C] focus:outline-none focus:border-[#C68B59] transition"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#C68B59]" />
            <span className="text-xs text-[#9F765E] uppercase tracking-wider font-semibold">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#1A0D08] border border-[#42281B] text-[#FFFDF9] text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#C68B59]"
            >
              <option value="default">Signature Order</option>
              <option value="price-low">Price: Low to High (AED)</option>
              <option value="price-high">Price: High to Low (AED)</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? items.length
                : items.filter((c) => c.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] shadow-md shadow-[#C68B59]/20 font-bold'
                    : 'bg-[#1A0D08] text-[#C9AF9D] hover:text-[#C68B59] hover:bg-[#42281B] border border-[#42281B]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-[#1A0D08]/30 text-[#1A0D08]' : 'bg-[#2C1810] text-[#9F765E]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Coffee Items */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <CoffeeCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#2C1810] rounded-2xl border border-[#42281B] p-8 space-y-3">
          <p className="font-serif text-lg text-[#FFFDF9]">No coffee items match your search query</p>
          <p className="text-xs text-[#9F765E]">Try clearing filters or search term to see all 8 items.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#C68B59] text-[#1A0D08] text-xs font-bold rounded-lg uppercase tracking-wider mt-2"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Barista Coffee Club Banner */}
      <div className="bg-gradient-to-r from-[#2C1810] via-[#42281B] to-[#2C1810] p-8 sm:p-10 rounded-3xl border border-[#C68B59]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-[#C68B59]/20 border border-[#C68B59]/40 flex items-center justify-center shrink-0 text-[#C68B59]">
            <Coffee className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C68B59] font-semibold">
              Office & Morning Subscriptions
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFDF9]">
              The Coffee & Pastry Morning Box
            </h3>
            <p className="text-xs text-[#EFE6DA] mt-1 max-w-xl">
              Order your favorite hot Spanish caramel latte, iced cold brews, and warm French butter croissants. Delivered within 45 minutes in insulated thermal sleeves.
            </p>
          </div>
        </div>

        <Link
          href="/cart"
          className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shrink-0"
        >
          View Bag & Checkout
        </Link>
      </div>
    </div>
  );
}
