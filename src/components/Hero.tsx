import React from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { ShieldCheck, ArrowRight, ArrowLeft, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenRfq: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenRfq }) => {
  const t = content[lang];
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-[at_top_right] from-orange-600/15 via-slate-900 to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-orange-400 uppercase mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-orange-500" />
              <span>{t.hero.badge}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">{t.brand.taglineEn}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white [text-wrap:balance] mb-6">
              {t.hero.titlePrimary}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                {t.hero.titleSecondary}
              </span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              {t.hero.description}
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{lang === 'ar' ? 'توريد مباشر معتمد من المصانع العالمية' : 'Direct certified factory distributions'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{lang === 'ar' ? 'شهادات اختبار وفحص معملية (Type Tests)' : 'Full Type-Test laboratory certificates'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{lang === 'ar' ? 'فريق تسعير هندسي واستجابة خلال ساعات' : 'Dedicated engineering quotation desk'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{lang === 'ar' ? 'أسطول نقل لوجستي للموقع بالمحافظات' : 'Nationwide direct on-site project logistics'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors shadow-lg shadow-orange-600/30 whitespace-nowrap"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenRfq}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <FileSpreadsheet className="w-4 h-4 text-orange-400" />
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>

          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
              <img
                src="/images/hero_electrical_substation_1794334721158.jpg"
                alt="AMG Group Industrial Electrical Distribution Substation"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Trust Badge at bottom of image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-orange-500/20 text-orange-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {lang === 'ar' ? 'معتمد للمشروعات الكبرى' : 'Approved For Mega Projects'}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      IEC 61439 · ISO 9001 · KEMA Tested
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <div className="text-xs font-mono font-bold text-orange-400 tabular-nums">
                    24/7 Supply
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {lang === 'ar' ? 'جاهزية فورية' : 'Immediate Dispatch'}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Full-width KPI Strip strictly below hero split as prescribed by design constitution */}
      <div className="border-t border-slate-800/80 bg-slate-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-x divide-slate-800/60 rtl:divide-x-reverse">
            
            <div className="px-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-white font-mono tabular-nums mb-1">
                {t.hero.stats.experienceVal}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {t.hero.stats.experience}
              </div>
            </div>

            <div className="px-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-orange-400 font-mono tabular-nums mb-1">
                {t.hero.stats.productsVal}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {t.hero.stats.products}
              </div>
            </div>

            <div className="px-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-white font-mono tabular-nums mb-1">
                {t.hero.stats.clientsVal}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {t.hero.stats.clients}
              </div>
            </div>

            <div className="px-3">
              <div className="text-2xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums mb-1">
                {t.hero.stats.complianceVal}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">
                {t.hero.stats.compliance}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
