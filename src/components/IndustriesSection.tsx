import React from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { industriesData } from '../data/products';
import { Factory, Zap, ShieldCheck, Building2, Check, Truck } from 'lucide-react';

interface IndustriesSectionProps {
  lang: Language;
}

const iconMap = {
  Factory: Factory,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  Building2: Building2
};

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ lang }) => {
  const t = content[lang];

  return (
    <section id="industries" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-widest text-orange-600 uppercase mb-2">
            Supply Coverage · نطاق تغطية الأعمال
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance] mb-4">
            {t.industries.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {t.industries.subtitle}
          </p>
        </div>

        {/* Bento-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {industriesData.map((item, idx) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Zap;
            const title = lang === 'ar' ? item.titleAr : item.titleEn;
            const desc = lang === 'ar' ? item.descAr : item.descEn;

            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100/80 text-orange-600 flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-slate-400 mb-1">
                    0{idx + 1}. Sector
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'ar' ? 'توريد مطابق للمواصفات' : 'Compliant Specs & Testing'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Logistics & Facility Highlight Box */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                <span>{lang === 'ar' ? 'منظومة التخزين واللوجستيات' : 'Central Warehouse & Logistics Network'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'ar'
                  ? 'مخازن مركزية مجهزة وأسطول توريد سريع لكافة المحافظات'
                  : 'Central Warehousing & Heavy Logistics Fleet Across Egypt'}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {lang === 'ar'
                  ? 'نمتلك مساحات تخزين استراتيجية تضم مخزوناً ضخماً من أطوال الكابلات المختلفة، اللوحات، والقواطع المعتمدة لتلبية احتياجات المقاولين الفورية دون تأخير في الجداول الزمنية لتسليم المشاريع.'
                  : 'Strategically stocked warehousing facilities maintaining large buffer stocks of power cables, switchboards, and automation gear to prevent schedule delays in client project handovers.'}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-200 font-medium">
                <div className="border-l-2 border-orange-500 pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
                  <span className="font-bold text-white text-base font-mono block">100%</span>
                  <span>{lang === 'ar' ? 'فحص جودة قبل الشحن' : 'Pre-dispatch QC Inspection'}</span>
                </div>
                <div className="border-l-2 border-orange-500 pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
                  <span className="font-bold text-white text-base font-mono block">24/48h</span>
                  <span>{lang === 'ar' ? 'زمن التوصيل الميداني' : 'Direct Site Delivery'}</span>
                </div>
                <div className="border-l-2 border-orange-500 pl-3 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-3">
                  <span className="font-bold text-white text-base font-mono block">Direct</span>
                  <span>{lang === 'ar' ? 'شهادات ضمان أصلية' : 'Factory Direct Warranties'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative min-h-[300px]">
              <img
                src="/images/facility_warehouse_logistics_1794334723225.jpg"
                alt="AMG Group Central Logistics Warehouse"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-transparent to-transparent rtl:lg:bg-gradient-to-l" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
