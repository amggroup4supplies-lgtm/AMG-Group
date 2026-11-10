import React from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenRfq }) => {
  const t = content[lang];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Slogan */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-11-02_at_1.17.17_PM_92f84895.jpeg"
                alt="AMG Group"
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain bg-white/10 rounded-lg p-1"
              />
              <div>
                <span className="text-xl font-black text-white tracking-tight block">
                  AMG GROUP
                </span>
                <span className="text-[10px] tracking-wider text-orange-400 font-semibold block uppercase">
                  GENERAL SUPPLIES & TRADING
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="text-xs font-semibold text-orange-400/90 tracking-wide">
              {t.brand.taglineEn}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  {t.nav.products}
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white transition-colors">
                  {t.nav.industries}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  {t.nav.calculator}
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-white transition-colors">
                  {t.brands.title}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenRfq}
                  className="text-orange-400 hover:text-orange-300 font-semibold text-start"
                >
                  {t.nav.requestQuote}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.nav.contact}
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="mailto:amg.group4supplies@gmail.com" className="hover:text-white">
                  amg.group4supplies@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href="tel:+201008924110" className="hover:text-white font-mono" dir="ltr">
                  +20 100 892 4110
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{t.brand.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>{t.footer.rights}</div>
          <div className="text-[11px] text-slate-500">
            {t.footer.compliance}
          </div>
        </div>

      </div>
    </footer>
  );
};
