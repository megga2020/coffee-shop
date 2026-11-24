'use client';

import React, { useState } from 'react';
import { CoffeeItem } from '@/data/items';
import { useCart } from '@/context/CartContext';
import { Star, Plus, Check, Eye, X, Coffee, Sparkles } from 'lucide-react';

interface CoffeeCardProps {
  item: CoffeeItem;
}

export default function CoffeeCard({ item }: CoffeeCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(item, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="group relative bg-[#2C1810] rounded-2xl overflow-hidden border border-[#C68B59]/25 hover:border-[#C68B59] shadow-xl hover:shadow-2xl hover:shadow-[#C68B59]/15 transition-all duration-300 flex flex-col justify-between">
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          {item.badge ? (
            <span className="bg-gradient-to-r from-[#E8C49A] to-[#C68B59] text-[#1A0D08] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-[#1A0D08]" />
              {item.badge}
            </span>
          ) : <span />}

          <span className="bg-[#1A0D08]/85 backdrop-blur-sm text-[#F7F2EB] text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#C68B59]/30">
            {item.temperature || 'Specialty'}
          </span>
        </div>

        {/* Product Image */}
        <div className="relative h-60 w-full overflow-hidden bg-[#1A0D08]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-transparent to-transparent opacity-80" />

          {/* Quick view button */}
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-3 right-3 p-2 rounded-full bg-[#1A0D08]/85 text-[#C68B59] hover:bg-[#C68B59] hover:text-[#1A0D08] transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            title="Quick Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#C68B59] mb-1">
              <span className="tracking-widest uppercase text-[10px] font-medium text-[#D9A76E]">
                {item.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#C68B59] text-[#C68B59]" />
                <span className="font-semibold text-[#FFFDF9]">{item.rating}</span>
                <span className="text-[#9F765E]">({item.reviewsCount})</span>
              </div>
            </div>

            <h3 className="font-serif text-lg font-bold text-[#FFFDF9] group-hover:text-[#C68B59] transition-colors line-clamp-1">
              {item.name}
            </h3>
            <p className="text-xs font-serif text-[#DFD3C3] mb-2">
              {item.arabicName}
            </p>

            <p className="text-xs text-[#C9AF9D] line-clamp-2 leading-relaxed mb-4">
              {item.description}
            </p>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="pt-3 border-t border-[#42281B] flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#9F765E] block">
                Price
              </span>
              <div className="font-serif text-xl font-bold text-[#C68B59] flex items-baseline gap-1">
                <span>{item.priceAED}</span>
                <span className="text-xs font-sans font-medium text-[#EFE6DA]">AED</span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 shadow-md ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] hover:brightness-110 active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#2C1810] border border-[#C68B59]/50 rounded-2xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-[#1A0D08]/80 text-[#C9AF9D] hover:text-white hover:bg-[#42281B] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-full bg-[#1A0D08]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  {item.badge && (
                    <span className="bg-[#C68B59] text-[#1A0D08] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#C68B59] mb-1">
                    {item.category} • {item.roastLevel || 'Artisan Special'}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#FFFDF9] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm font-serif text-[#DFD3C3] mb-3">
                    {item.arabicName}
                  </p>

                  <p className="text-xs text-[#EFE6DA] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-4 text-xs">
                    {item.origin && (
                      <div>
                        <strong className="text-[#C68B59]">Bean Origin:</strong>{' '}
                        <span className="text-[#FFFDF9]">{item.origin}</span>
                      </div>
                    )}
                    {item.notes && item.notes.length > 0 && (
                      <div>
                        <strong className="text-[#C68B59]">Tasting Notes:</strong>{' '}
                        <span className="text-[#C9AF9D]">{item.notes.join(' • ')}</span>
                      </div>
                    )}
                    {item.calories && (
                      <div>
                        <strong className="text-[#9F765E]">Calories:</strong>{' '}
                        <span className="text-[#C9AF9D]">{item.calories}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#42281B] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#9F765E]">Price</span>
                    <div className="font-serif text-2xl font-bold text-[#C68B59]">
                      {item.priceAED} <span className="text-xs font-sans text-[#EFE6DA]">AED</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#42281B] rounded-lg bg-[#1A0D08]">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2.5 py-1 text-sm text-[#C68B59] hover:bg-[#42281B]"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#FFFDF9]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-1 text-sm text-[#C68B59] hover:bg-[#42281B]"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        handleAdd();
                        setShowModal(false);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
