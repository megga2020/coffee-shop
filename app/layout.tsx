import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Coffee Shop | Specialty Artisan Roastery & Bakery in Dubai (AED)',
  description: 'Specialty coffee roastery in Dubai featuring single-origin espresso, caramel Spanish latte, cold brew, and fresh French pastries. Express courier in UAE.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#1A0D08] text-[#FFFDF9] antialiased selection:bg-[#C68B59] selection:text-[#1A0D08]">
        <CartProvider>
          <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
