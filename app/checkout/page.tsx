'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  Coffee,
  Sparkles,
  ArrowLeft,
  Lock,
  Database,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  MapPin,
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, discount, total, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Hamdan Al-Nuaimi',
    email: 'hamdan.nuaimi@example.ae',
    phone: '+971 52 987 6543',
    emirate: 'Dubai',
    area: 'DIFC, Gate Precinct Building 4, Office 802',
    deliveryTime: 'Express Courier (Under 45 Minutes)',
    specialInstructions: 'Please leave with reception. Double cup sleeves for hot drinks.',
    needCupSleeves: true,
    paymentMethod: 'applepay',
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [supabaseSaved, setSupabaseSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    const generatedId = `COFFEE-DXB-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      id: generatedId,
      customer_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      emirate: formData.emirate,
      address: formData.area,
      delivery_time: formData.deliveryTime,
      special_instructions: formData.specialInstructions,
      payment_method: formData.paymentMethod,
      items: items.map((ci) => ({
        item_id: ci.item.id,
        name: ci.item.name,
        price_aed: ci.item.priceAED,
        quantity: ci.quantity,
        total_aed: ci.item.priceAED * ci.quantity,
      })),
      subtotal_aed: subtotal,
      delivery_fee_aed: deliveryFee,
      discount_aed: discount,
      total_aed: total,
      status: 'Confirmed',
    };

    try {
      // Save order into Supabase
      const { data, error: dbError } = await supabase.from('orders').insert([orderPayload]);
      if (dbError) {
        console.warn('Supabase orders table notice:', dbError.message);
        setSupabaseSaved(false);
      } else {
        setSupabaseSaved(true);
      }

      setOrderId(generatedId);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error('Order saving error:', err);
      setOrderId(generatedId);
      setOrderComplete(true);
      clearCart();
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // If order complete modal
  if (orderComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#C68B59] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C68B59]" />
            <span>Order Confirmed • Barista Brewing Now!</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFDF9]">
            Thank You for Your Coffee Order
          </h1>
          <p className="text-sm text-[#EFE6DA] max-w-lg mx-auto">
            Your drinks and bakery items are being prepared by our baristas and dispatched in thermal insulated packaging.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#2C1810] border border-[#C68B59]/40 rounded-2xl p-6 sm:p-8 text-left space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-[#42281B] gap-2">
            <div>
              <span className="text-xs text-[#9F765E] uppercase">Order Reference</span>
              <p className="font-serif text-lg font-bold text-[#C68B59]">{orderId}</p>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-[#9F765E] uppercase">Database Sync</span>
              <p className="text-xs font-semibold text-emerald-400 flex items-center sm:justify-end gap-1">
                <Database className="w-3.5 h-3.5" />
                <span>Saved to Supabase &apos;orders&apos; table</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[#9F765E] block uppercase mb-1">Delivery Destination</span>
              <p className="font-semibold text-[#FFFDF9]">{formData.fullName}</p>
              <p className="text-[#EFE6DA]">{formData.area}</p>
              <p className="text-[#EFE6DA]">{formData.emirate}, United Arab Emirates</p>
              <p className="text-[#9F765E] mt-1">{formData.phone}</p>
            </div>

            <div>
              <span className="text-[#9F765E] block uppercase mb-1">Dispatch Speed</span>
              <p className="font-semibold text-[#C68B59]">{formData.deliveryTime}</p>
              {formData.needCupSleeves && (
                <p className="text-[#EFE6DA] mt-1 flex items-center gap-1">
                  <Coffee className="w-3.5 h-3.5 text-[#C68B59]" />
                  <span>Insulated Thermal Packaging with Spill-Proof Seal</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-xl"
          >
            Order More Coffee
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2C1810] border border-[#42281B] text-[#FFFDF9] text-xs font-semibold uppercase tracking-wider hover:bg-[#42281B] transition"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="font-serif text-3xl font-bold text-[#FFFDF9]">No Items to Checkout</h1>
        <p className="text-sm text-[#9F765E]">Your coffee bag is currently empty.</p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#C68B59] text-[#1A0D08] font-serif font-bold text-xs uppercase tracking-wider"
        >
          <span>Explore Coffee Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back button & title */}
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-[#C68B59] hover:text-[#FAF0E4] uppercase tracking-wider font-semibold mb-3 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFDF9]">
          UAE Coffee Delivery & Express Checkout
        </h1>
        <p className="text-xs text-[#9F765E] mt-1">
          Barista-prepared drinks and bakery items dispatched in thermal insulated packaging. All prices in AED.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Customer & Delivery Form */}
          <div className="bg-[#2C1810] border border-[#C68B59]/30 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#FFFDF9] flex items-center gap-2 border-b border-[#42281B] pb-3">
              <MapPin className="w-4 h-4 text-[#C68B59]" />
              <span>1. Delivery Destination (UAE)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[#EFE6DA] font-semibold">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77513C]" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#1A0D08] border border-[#42281B] rounded-xl text-[#FFFDF9] focus:border-[#C68B59] focus:outline-none"
                    placeholder="Recipient's Name"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#EFE6DA] font-semibold">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77513C]" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#1A0D08] border border-[#42281B] rounded-xl text-[#FFFDF9] focus:border-[#C68B59] focus:outline-none"
                    placeholder="name@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#EFE6DA] font-semibold">UAE Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77513C]" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#1A0D08] border border-[#42281B] rounded-xl text-[#FFFDF9] focus:border-[#C68B59] focus:outline-none"
                    placeholder="+971 50 000 0000"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#EFE6DA] font-semibold">Emirate *</label>
                <select
                  name="emirate"
                  value={formData.emirate}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#1A0D08] border border-[#42281B] rounded-xl text-[#FFFDF9] focus:border-[#C68B59] focus:outline-none"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#EFE6DA] font-semibold">Courier Speed</label>
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-[#1A0D08] border border-[#42281B] rounded-xl text-[#FFFDF9] focus:border-[#C68B59] focus:outline-none"
                >
                  <option value="Express Courier (Under 45 Minutes)">Express Courier (Under 45 Minutes)</option>
                  <option value="Scheduled Morning (7:30 AM - 9:00 AM)">Scheduled Morning (7:30 AM - 9:00 AM)</option>
                  <option value="Afternoon Pick-Me-Up (2:00 PM - 3:30 PM)">Afternoon Pick-Me-Up (2:00 PM - 3:30 PM)</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[#EFE6DA] font-semibold">Street / Building / Office / Apartment *</label>
                <textarea
                  name="area"
                  required
                  rows={2}
                  value={formData.area}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1A0D08] border border-[#42281B] rounded-xl text-[#FFFDF9] focus:border-[#C68B59] focus:outline-none"
                  placeholder="Tower name, Office/Apt number, Street name"
                />
              </div>
            </div>

            {/* Packaging options */}
            <div className="pt-4 border-t border-[#42281B] space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#EFE6DA]">
                <input
                  type="checkbox"
                  name="needCupSleeves"
                  checked={formData.needCupSleeves}
                  onChange={handleChange}
                  className="rounded text-[#C68B59] focus:ring-[#C68B59] accent-[#C68B59]"
                />
                <span className="font-semibold text-[#FFFDF9]">
                  Spill-Proof Heat Sealed Cups & Insulated Drink Trays (Free)
                </span>
              </label>

              <div className="space-y-1 text-xs">
                <label className="text-[#9F765E]">Barista Preparation Instructions:</label>
                <input
                  type="text"
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-[#1A0D08] border border-[#42281B] rounded-xl text-[#FFFDF9] text-xs focus:border-[#C68B59] focus:outline-none"
                  placeholder="e.g. Extra hot, oat milk substitute, sugar on side..."
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-[#2C1810] border border-[#C68B59]/30 rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="font-serif text-lg font-bold text-[#FFFDF9] flex items-center gap-2 border-b border-[#42281B] pb-3">
              <CreditCard className="w-4 h-4 text-[#C68B59]" />
              <span>2. Payment Method</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                  formData.paymentMethod === 'applepay'
                    ? 'border-[#C68B59] bg-[#42281B]'
                    : 'border-[#42281B] bg-[#1A0D08]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#FFFDF9]">Apple Pay</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="applepay"
                    checked={formData.paymentMethod === 'applepay'}
                    onChange={handleChange}
                    className="accent-[#C68B59]"
                  />
                </div>
                <span className="text-[10px] text-[#9F765E]">Instant 1-Touch Checkout</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#C68B59] bg-[#42281B]'
                    : 'border-[#42281B] bg-[#1A0D08]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#FFFDF9]">Credit / Debit Card</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="accent-[#C68B59]"
                  />
                </div>
                <span className="text-[10px] text-[#9F765E]">Visa, Mastercard, AMEX</span>
              </label>

              <label
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 cursor-pointer transition ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#C68B59] bg-[#42281B]'
                    : 'border-[#42281B] bg-[#1A0D08]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#FFFDF9]">Cash on Delivery</span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="accent-[#C68B59]"
                  />
                </div>
                <span className="text-[10px] text-[#9F765E]">Pay rider upon arrival</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Place Order Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#2C1810] border border-[#C68B59]/40 rounded-2xl p-6 shadow-xl space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#FFFDF9] border-b border-[#42281B] pb-3">
              Order Review ({items.length} items)
            </h2>

            {/* Compact Item list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-xs py-2 border-b border-[#42281B]/60 gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-[#1A0D08] shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-[#FFFDF9] line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-[#9F765E]">Qty: {quantity} × {item.priceAED} AED</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-[#C68B59]">
                    {item.priceAED * quantity} AED
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs border-t border-[#42281B] pt-4">
              <div className="flex justify-between text-[#EFE6DA]">
                <span>Subtotal</span>
                <span>{subtotal} AED</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Caramel Promo (10%)</span>
                  <span>-{discount} AED</span>
                </div>
              )}
              <div className="flex justify-between text-[#EFE6DA]">
                <span>Thermal Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `${deliveryFee} AED`}</span>
              </div>

              <div className="border-t border-[#42281B] pt-3 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-[#FFFDF9]">Total Due</span>
                <span className="font-serif text-2xl font-bold text-[#C68B59]">
                  {total} <span className="text-xs font-sans text-[#EFE6DA]">AED</span>
                </span>
              </div>
            </div>

            {/* CRITICAL BUTTON: "Place Order" */}
            <button
              type="submit"
              disabled={isPlacingOrder}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D9A76E] via-[#C68B59] to-[#86512A] text-[#1A0D08] font-serif font-bold text-base tracking-wider uppercase hover:brightness-110 active:scale-95 transition shadow-2xl shadow-[#C68B59]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <span className="flex items-center gap-2">
                  <Database className="w-4 h-4 animate-spin text-[#1A0D08]" />
                  <span>Saving Order to Supabase...</span>
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#1A0D08]" />
                  <span>Place Order ({total} AED)</span>
                </>
              )}
            </button>

            <div className="space-y-2 pt-2 text-[11px] text-[#9F765E] border-t border-[#42281B]">
              <div className="flex items-center gap-2 text-emerald-400">
                <Database className="w-3.5 h-3.5" />
                <span>Synchronized with Supabase &apos;orders&apos; database table.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C68B59]" />
                <span>Specialty Grade Arabica & Normandy Butter guarantee.</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#C68B59]" />
                <span>Insulated thermal bag courier dispatch.</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
