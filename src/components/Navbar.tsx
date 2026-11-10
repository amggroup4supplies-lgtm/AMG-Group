import React, { useState } from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { ShoppingBag, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenRfq: () => void;
  rfqItemCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenRfq,
  rfqItemCount
}) => {
  const t = content[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single Brand Zone */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-11-02_at_1.17.17_PM_92f84895.jpeg"
              alt="AMG Group Logo"
              referrerPolicy="no-referrer"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                AMG GROUP
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500">
                General Supplies & Trading
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a href="#products" className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-orange-500">
              {t.nav.products}
            </a>
            <a href="#industries" className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-orange-500">
              {t.nav.industries}
            </a>
            <a href="#calculator" className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-orange-500">
              {t.nav.calculator}
            </a>
            <a href="#brands" className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-orange-500">
              {t.brands.title}
            </a>
            <a href="#contact" className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-orange-500">
              {t.nav.contact}
            </a>
          </nav>

          {/* Zone 3: Language toggle & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switch */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* RFQ Cart Icon / Trigger */}
            <button
              onClick={onOpenRfq}
              className="relative p-2 text-slate-700 hover:text-orange-600 bg-slate-50 hover:bg-orange-50 border border-slate-200 rounded-lg transition-colors"
              title={t.nav.cart}
            >
              <ShoppingBag className="w-5 h-5" />
              {rfqItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-white bg-orange-600 rounded-full animate-in zoom-in">
                  {rfqItemCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenRfq}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-orange-600 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <span>{t.nav.requestQuote}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 bg-slate-100 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.nav.products}
            </a>
            <a
              href="#industries"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.nav.industries}
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.nav.calculator}
            </a>
            <a
              href="#brands"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.brands.title}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full py-3 px-4 text-center text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>{t.nav.requestQuote}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
