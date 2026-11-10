import React, { useState, useEffect } from 'react';
import { Language, Product, RfqItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { IndustriesSection } from './components/IndustriesSection';
import { BrandPartners } from './components/BrandPartners';
import { TechnicalCalculators } from './components/TechnicalCalculators';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RfqModal } from './components/RfqModal';
import { MessageSquare, ArrowUp, ShoppingBag, Check } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqItems, setRfqItems] = useState<RfqItem[]>(() => {
    try {
      const saved = localStorage.getItem('amg_rfq_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync html dir and lang attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Persist RFQ items
  useEffect(() => {
    try {
      localStorage.setItem('amg_rfq_items', JSON.stringify(rfqItems));
    } catch {
      // Ignore storage errors
    }
  }, [rfqItems]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setRfqItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    const pName = lang === 'ar' ? product.nameAr : product.nameEn;
    showToast(
      lang === 'ar'
        ? `تمت إضافة "${pName}" لقائمة التسعير`
        : `Added "${pName}" to RFQ list`
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setRfqItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setRfqItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setRfqItems([]);
  };

  const totalItemCount = rfqItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Bar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        onOpenRfq={() => setIsRfqOpen(true)}
        rfqItemCount={totalItemCount}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenRfq={() => setIsRfqOpen(true)}
        />

        {/* Product Catalog */}
        <ProductCatalog
          lang={lang}
          onAddToCart={handleAddToCart}
          cartProductIds={rfqItems.map((i) => i.product.id)}
          onOpenRfq={() => setIsRfqOpen(true)}
        />

        {/* Industries & Facilities */}
        <IndustriesSection
          lang={lang}
        />

        {/* Engineering Calculators */}
        <TechnicalCalculators
          lang={lang}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onOpenRfq={() => setIsRfqOpen(true)}
        />

        {/* Authorized Brands */}
        <BrandPartners
          lang={lang}
        />

        {/* Contact & RFQ Submission */}
        <ContactSection
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenRfq={() => setIsRfqOpen(true)}
      />

      {/* Interactive RFQ Modal */}
      <RfqModal
        lang={lang}
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        items={rfqItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsRfqOpen(true)}
            className="ml-2 rtl:ml-0 rtl:mr-2 px-2.5 py-1 rounded bg-orange-600 hover:bg-orange-500 text-white text-[11px] font-bold"
          >
            {lang === 'ar' ? 'عرض السلة' : 'View RFQ'}
          </button>
        </div>
      )}

      {/* Floating Direct WhatsApp Action Button */}
      <aside aria-label="Support and Quick Contact" className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex flex-col gap-3">
        {totalItemCount > 0 && (
          <button
            onClick={() => setIsRfqOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg text-xs font-bold transition-transform hover:scale-105"
            title={lang === 'ar' ? 'فتح سلة التسعير' : 'Open RFQ Cart'}
          >
            <ShoppingBag className="w-4 h-4 text-orange-400" />
            <span>
              {lang === 'ar' ? `قائمة التسعير (${totalItemCount})` : `RFQ Cart (${totalItemCount})`}
            </span>
          </button>
        )}

        <a
          href="https://wa.me/201008924110"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-transform hover:scale-110"
          title={lang === 'ar' ? 'تواصل معنا مباشرة عبر واتساب' : 'Chat on WhatsApp'}
        >
          <MessageSquare className="w-6 h-6" />
        </a>
      </aside>

    </div>
  );
}
