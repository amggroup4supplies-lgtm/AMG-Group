import React from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { Award, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface BrandPartnersProps {
  lang: Language;
}

export const BrandPartners: React.FC<BrandPartnersProps> = ({ lang }) => {
  const t = content[lang];

  const brandLogos = [
    {
      id: 'elsewedy',
      name: 'Elsewedy Electric',
      nameAr: 'السويدي إليكتريك',
      taglineAr: 'كابلات القوى والأسلاك والمحولات',
      taglineEn: 'Power Cables & Distribution Wires',
      color: '#e11d48',
      badgeAr: 'توريد معتمد 100% بالأطوال',
      badgeEn: 'Certified Factory Supply',
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-rose-600 text-white font-black flex items-center justify-center text-lg tracking-tighter shadow-xs">
            SE
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-slate-900 leading-none">
              ELSEWEDY
            </div>
            <div className="text-[10px] font-bold text-rose-600 tracking-wider uppercase">
              ELECTRIC
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'schneider',
      name: 'Schneider Electric',
      nameAr: 'شنايدر إلكتريك',
      taglineAr: 'القواطع الذكية، اللوحات وكونتاكتورات',
      taglineEn: 'Switchgear, Breakers & Automation',
      color: '#059669',
      badgeAr: 'موزع حلول الطاقة والتحكم',
      badgeEn: 'Authorized Distribution',
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-sm tracking-tight shadow-xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-emerald-700 leading-none">
              Schneider
            </div>
            <div className="text-[10px] font-semibold text-slate-600 tracking-widest uppercase">
              Electric
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'abb',
      name: 'ABB',
      nameAr: 'إيه بي بي العالمية',
      taglineAr: 'مغيرات سرعة VFD وقواطع Emax',
      taglineEn: 'Drives, VFDs & Air Circuit Breakers',
      color: '#dc2626',
      badgeAr: 'حلول التحكم والحماية المتقدمة',
      badgeEn: 'Motion & Power Solutions',
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white font-black tracking-tighter text-xl leading-none shadow-xs font-mono">
            ABB
          </div>
          <div className="text-xs text-slate-500 font-medium leading-tight">
            Power &amp; Automation
          </div>
        </div>
      )
    },
    {
      id: 'siemens',
      name: 'Siemens',
      nameAr: 'سيمنز الألمانية',
      taglineAr: 'أنظمة أتمتة PLC S7 وشاشات HMI',
      taglineEn: 'Industrial Automation & PLC S7',
      color: '#0891b2',
      badgeAr: 'تكامل أنظمة التحكم والمصانع',
      badgeEn: 'Factory Automation Systems',
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="text-xl font-black tracking-widest text-cyan-700 font-sans uppercase">
            SIEMENS
          </div>
        </div>
      )
    },
    {
      id: 'legrand',
      name: 'Legrand',
      nameAr: 'ليجراند الفرنسية',
      taglineAr: 'كابل تري، علب ومستلزمات تمديد',
      taglineEn: 'Cable Management & Enclosures',
      color: '#ea580c',
      badgeAr: 'تجهيزات المشروعات والأبراج',
      badgeEn: 'Commercial & MEP Solutions',
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded bg-slate-900 border-l-4 border-red-600 text-white font-extrabold text-sm tracking-tight">
            legrand
          </div>
        </div>
      )
    },
    {
      id: 'chint',
      name: 'Chint Electric',
      nameAr: 'شنت إليكتريك',
      taglineAr: 'قواطع MCB/MCCB ومستلزمات لوحات',
      taglineEn: 'Circuit Breakers & Modular Gear',
      color: '#2563eb',
      badgeAr: 'حلول اقتصادية معتمدة IEC',
      badgeEn: 'IEC Certified Distribution',
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="text-xl font-black tracking-tight text-blue-700 font-sans uppercase">
            CHNT
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase">Electric</span>
        </div>
      )
    },
    {
      id: '3m',
      name: '3M Electrical',
      nameAr: 'ثري إم للتوريدات الكهربائية',
      taglineAr: 'شرايط لحام، علب راتنج وجوانات كابلات',
      taglineEn: 'Tapes, Splices & Heat Shrink',
      color: '#e11d48',
      badgeAr: 'عوازل كابلات ومستلزمات وصلات',
      badgeEn: 'Cable Splicing & Terminations',
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="text-2xl font-black text-red-600 tracking-tighter font-sans">
            3M
          </div>
          <span className="text-[11px] font-bold text-slate-700">Electrical Markets</span>
        </div>
      )
    },
    {
      id: 'furse',
      name: 'Furse Grounding',
      nameAr: 'فيرس العالمية لأنظمة التأريض',
      taglineAr: 'حربات صواعق، إلكترودات وموصلات نحاس',
      taglineEn: 'Lightning Protection & Earthing',
      color: '#d97706',
      badgeAr: 'أنظمة حماية الصواعق والتأريض',
      badgeEn: 'Structural Lightning Systems',
      renderLogo: () => (
        <div className="flex items-center gap-2">
          <div className="text-lg font-black tracking-wider text-amber-700 uppercase font-mono">
            FURSE
          </div>
          <span className="text-[10px] text-slate-500 font-semibold">ABB Group</span>
        </div>
      )
    }
  ];

  return (
    <section id="brands" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-widest text-orange-600 uppercase mb-2">
            Authorized Brands Portfolio · شركاء التوريد والاعتماد
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance] mb-4">
            {lang === 'ar' ? 'الماركات والشركات العالمية المعتمدة' : 'Authorized Global Manufacturers'}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {lang === 'ar'
              ? 'نلتزم بتوريد كافة أصناف ومهمات المشروعات من كبرى المصانع المعتمدة بشهادات اختبارات معملية وضمان الوكلاء المعتمدين في مصر.'
              : 'AMG Group is an official procurement channel for tier-1 global electrical manufacturers, providing original equipment with factory test certificates.'}
          </p>
        </div>

        {/* Brands Logo Grid (Styled like high-end distributor platforms such as Egy Power) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brandLogos.map((brand) => (
            <div
              key={brand.id}
              className="p-5 bg-white rounded-xl border border-slate-200/90 hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Logo Box */}
                <div className="h-16 flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  {brand.renderLogo()}
                  <span className="text-[10px] text-slate-400 font-mono">Original</span>
                </div>

                {/* Subtitle / Scope */}
                <div className="text-xs font-bold text-slate-900 mb-1">
                  {lang === 'ar' ? brand.nameAr : brand.name}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {lang === 'ar' ? brand.taglineAr : brand.taglineEn}
                </p>
              </div>

              {/* Status Badge */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{lang === 'ar' ? brand.badgeAr : brand.badgeEn}</span>
                </span>
                <span className="text-orange-500 font-bold group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                  &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Guarantee Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center gap-5 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center sm:text-start">
            <div className="text-sm font-bold text-slate-900">
              {lang === 'ar'
                ? 'شهادات اختبار المصنع وشهادات المنشأ (Type Tests & Mill Test Certificates)'
                : 'Factory Type-Test & Origin Credentials'}
            </div>
            <div className="text-xs text-slate-600 mt-1 leading-relaxed">
              {lang === 'ar'
                ? 'جميع الكابلات، قواطع التيار، مواسير EMT، وأنظمة التأريض تسلم للموقع مع كشوف الفحص الفني وأرقام التشغيل وشهادة ضمان الوكيل المعتمد لتقديمها لاستشاري المشروع مباشرة.'
                : 'All supplied cables, switchboards, conduits, and earthing packages are dispatched with authenticated QA/QC inspection sheets for immediate consultant submittal.'}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
