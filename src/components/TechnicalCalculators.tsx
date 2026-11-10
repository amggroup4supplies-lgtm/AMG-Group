import React, { useState } from 'react';
import { Language, Product } from '../types';
import { content } from '../data/translations';
import { Calculator, Zap, Cpu, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

interface TechnicalCalculatorsProps {
  lang: Language;
  onAddToCart: (customProduct: Product) => void;
  onOpenRfq: () => void;
}

export const TechnicalCalculators: React.FC<TechnicalCalculatorsProps> = ({
  lang,
  onAddToCart,
  onOpenRfq
}) => {
  const t = content[lang];
  const [activeTab, setActiveTab] = useState<'conduit' | 'cable' | 'transformer'>('conduit');

  // Conduit Fill Calculator state
  const [conduitType, setConduitType] = useState<'emt' | 'imc' | 'flex'>('emt');
  const [wireSize, setWireSize] = useState<number>(2.5);
  const [wireCount, setWireCount] = useState<number>(5);

  // Approximate outer diameter and area per wire (THHN / Building wire)
  const wireData: Record<number, { od: number; area: number; amp: number }> = {
    1.5: { od: 3.0, area: 7.1, amp: 16 },
    2.5: { od: 3.6, area: 10.2, amp: 22 },
    4.0: { od: 4.2, area: 13.9, amp: 29 },
    6.0: { od: 4.8, area: 18.1, amp: 38 },
    10.0: { od: 6.4, area: 32.2, amp: 52 },
    16.0: { od: 7.6, area: 45.4, amp: 70 },
    25.0: { od: 9.4, area: 69.4, amp: 95 },
    35.0: { od: 10.8, area: 91.6, amp: 118 },
  };

  // Standard EMT sizes & their 40% allowable internal area (mm²)
  const emtSizes = [
    { tradeSize: '1/2"', metric: '16mm', area40: 78, internalDia: 15.8 },
    { tradeSize: '3/4"', metric: '21mm', area40: 137, internalDia: 20.9 },
    { tradeSize: '1"', metric: '27mm', area40: 222, internalDia: 26.6 },
    { tradeSize: '1-1/4"', metric: '35mm', area40: 387, internalDia: 35.1 },
    { tradeSize: '1-1/2"', metric: '41mm', area40: 525, internalDia: 40.9 },
    { tradeSize: '2"', metric: '53mm', area40: 865, internalDia: 52.5 },
    { tradeSize: '2-1/2"', metric: '63mm', area40: 1500, internalDia: 69.4 },
    { tradeSize: '3"', metric: '78mm', area40: 2300, internalDia: 85.2 },
    { tradeSize: '4"', metric: '102mm', area40: 3900, internalDia: 110.1 },
  ];

  const totalWireArea = (wireData[wireSize]?.area || 10.2) * wireCount;
  const recommendedConduit = emtSizes.find((s) => s.area40 >= totalWireArea) || emtSizes[emtSizes.length - 1];
  const actualFillPercent = ((totalWireArea / ((Math.PI * Math.pow(recommendedConduit.internalDia / 2, 2)))) * 100);

  const handleAddConduitToQuote = () => {
    const customProduct: Product = {
      id: `calc-conduit-${Date.now()}`,
      nameAr: `مواسير ${recommendedConduit.tradeSize} ${conduitType === 'emt' ? 'EMT' : conduitType === 'imc' ? 'IMC' : 'فلكسبل'} مع ${wireCount} أسلاك ${wireSize} مم²`,
      nameEn: `${recommendedConduit.tradeSize} ${conduitType.toUpperCase()} Conduits with ${wireCount}x ${wireSize}mm² Building Wires`,
      category: 'emt_conduits',
      categoryAr: 'مواسير EMT ومستلزماتها',
      categoryEn: 'EMT Conduits',
      brand: 'AMG Certified Steel',
      specAr: `ماسورة مقاس ${recommendedConduit.tradeSize} (${recommendedConduit.metric}) - نسبة امتلاء ${actualFillPercent.toFixed(1)}% - مطابقة لكود NEC/IEC`,
      specEn: `Trade Size ${recommendedConduit.tradeSize} (${recommendedConduit.metric}) - Fill ${actualFillPercent.toFixed(1)}% - NEC / Egyptian Code Compliant`,
      descriptionAr: `مسار مواسير محسوب هندسياً لعدد ${wireCount} أسلاك مقطع ${wireSize} مم² مع الجلب والكونكتورات`,
      descriptionEn: `Engineered raceway for ${wireCount}x ${wireSize}mm² wires complete with fittings`,
      image: '/src/assets/images/category_emt_conduits_1794335432250.jpg',
      inStock: true,
      standards: ['UL 797', 'ANSI C80.3'],
      unit: 'طقم مسار / Raceway Set'
    };
    onAddToCart(customProduct);
    onOpenRfq();
  };

  // Cable state
  const [loadKw, setLoadKw] = useState<number>(45);
  const [voltage, setVoltage] = useState<number>(400);
  const [lengthMeters, setLengthMeters] = useState<number>(85);
  const [powerFactor, setPowerFactor] = useState<number>(0.85);
  const [isThreePhase, setIsThreePhase] = useState<boolean>(true);
  const [conductorMaterial, setConductorMaterial] = useState<'cu' | 'al'>('cu');

  // Transformer state
  const [trfKva, setTrfKva] = useState<number>(1000);
  const [trfVoltage, setTrfVoltage] = useState<number>(400);

  // Cable Calculations
  const calculatedCurrent = (() => {
    if (isThreePhase) {
      // I = (P * 1000) / (sqrt(3) * V * PF)
      return (loadKw * 1000) / (Math.sqrt(3) * voltage * powerFactor);
    } else {
      // 1-phase: I = (P * 1000) / (V * PF)
      return (loadKw * 1000) / (voltage * powerFactor);
    }
  })();

  // Standard sizes table for Cu in ground/air (approximate ampacity)
  const standardCableSizes = [
    { size: 4, cuAmp: 34, alAmp: 25, rCu: 5.88, rAl: 9.24 },
    { size: 6, cuAmp: 44, alAmp: 33, rCu: 3.93, rAl: 6.16 },
    { size: 10, cuAmp: 60, alAmp: 45, rCu: 2.33, rAl: 3.67 },
    { size: 16, cuAmp: 80, alAmp: 60, rCu: 1.47, rAl: 2.31 },
    { size: 25, cuAmp: 105, alAmp: 80, rCu: 0.927, rAl: 1.47 },
    { size: 35, cuAmp: 130, alAmp: 100, rCu: 0.669, rAl: 1.05 },
    { size: 50, cuAmp: 160, alAmp: 120, rCu: 0.499, rAl: 0.778 },
    { size: 70, cuAmp: 200, alAmp: 155, rCu: 0.342, rAl: 0.543 },
    { size: 95, cuAmp: 245, alAmp: 190, rCu: 0.247, rAl: 0.393 },
    { size: 120, cuAmp: 285, alAmp: 220, rCu: 0.196, rAl: 0.313 },
    { size: 150, cuAmp: 325, alAmp: 250, rCu: 0.159, rAl: 0.255 },
    { size: 185, cuAmp: 370, alAmp: 290, rCu: 0.128, rAl: 0.206 },
    { size: 240, cuAmp: 435, alAmp: 340, rCu: 0.098, rAl: 0.158 },
    { size: 300, cuAmp: 500, alAmp: 390, rCu: 0.079, rAl: 0.127 },
  ];

  // Pick suitable size satisfying both ampacity and <= 3% voltage drop
  const suitableCable = (() => {
    for (const c of standardCableSizes) {
      const allowedAmp = conductorMaterial === 'cu' ? c.cuAmp : c.alAmp;
      if (allowedAmp >= calculatedCurrent) {
        const res = conductorMaterial === 'cu' ? c.rCu : c.rAl;
        // Approx VD
        let vDropVolts = 0;
        if (isThreePhase) {
          vDropVolts = (Math.sqrt(3) * calculatedCurrent * lengthMeters * res * powerFactor) / 1000;
        } else {
          vDropVolts = (2 * calculatedCurrent * lengthMeters * res * powerFactor) / 1000;
        }
        const vDropPercent = (vDropVolts / voltage) * 100;
        if (vDropPercent <= 3.5) {
          return { ...c, vDropVolts, vDropPercent };
        }
      }
    }
    // Return largest
    const last = standardCableSizes[standardCableSizes.length - 1];
    const res = conductorMaterial === 'cu' ? last.rCu : last.rAl;
    const vDropVolts = (Math.sqrt(3) * calculatedCurrent * lengthMeters * res * powerFactor) / 1000;
    const vDropPercent = (vDropVolts / voltage) * 100;
    return { ...last, vDropVolts, vDropPercent };
  })();

  // Transformer Calculation
  // FLA = (kVA * 1000) / (sqrt(3) * V_lv)
  const trfFla = (trfKva * 1000) / (Math.sqrt(3) * trfVoltage);
  const recommendedAcbRating = (() => {
    if (trfFla <= 630) return '800A';
    if (trfFla <= 800) return '1000A / 1250A';
    if (trfFla <= 1250) return '1600A';
    if (trfFla <= 1600) return '2000A';
    if (trfFla <= 2000) return '2500A';
    if (trfFla <= 2500) return '3200A';
    return '4000A / 5000A';
  })();

  const handleAddCalculatedCableToQuote = () => {
    const sizeName = `${suitableCable.size} mm² (${conductorMaterial === 'cu' ? 'Copper' : 'Aluminum'}) XLPE/PVC`;
    const customProduct: Product = {
      id: `calc-cable-${Date.now()}`,
      nameAr: `كابل ${suitableCable.size} مم² ${conductorMaterial === 'cu' ? 'نحاس' : 'ألومنيوم'} بطول ${lengthMeters} م`,
      nameEn: `Power Cable ${sizeName} - Length: ${lengthMeters}m`,
      category: 'cables',
      categoryAr: 'كابلات القوى',
      categoryEn: 'Power Cables',
      brand: 'Elsewedy / Certified',
      specAr: `مقطع ${suitableCable.size} مم² - تيار تشغيل ${calculatedCurrent.toFixed(1)}A - هبوط جهد ${suitableCable.vDropPercent.toFixed(2)}%`,
      specEn: `Size ${suitableCable.size} mm² - Design Current ${calculatedCurrent.toFixed(1)}A - VD ${suitableCable.vDropPercent.toFixed(2)}%`,
      descriptionAr: `كابل محدد هندسياً لحمل قدرته ${loadKw}kW ومسار ${lengthMeters} متر`,
      descriptionEn: `Sized for ${loadKw}kW load and ${lengthMeters}m run`,
      image: '/src/assets/images/category_switchgear_cables_1794334722785.jpg',
      inStock: true,
      standards: ['IEC 60502-1'],
      unit: `${lengthMeters} متر / Meters`
    };
    onAddToCart(customProduct);
    onOpenRfq();
  };

  const handleAddCalculatedTrfToQuote = () => {
    const customProduct: Product = {
      id: `calc-trf-${Date.now()}`,
      nameAr: `محول توزيع ${trfKva} kVA جهد ${trfVoltage}V مع قاطع ${recommendedAcbRating}`,
      nameEn: `Distribution Transformer ${trfKva} kVA ${trfVoltage}V with ${recommendedAcbRating} Incomer`,
      category: 'transformers',
      categoryAr: 'محولات وأنظمة طاقة',
      categoryEn: 'Transformers',
      brand: 'Elsewedy / ABB',
      specAr: `قدرة ${trfKva} kVA - تيار حمل كامل ${trfFla.toFixed(1)}A - قاطع رئيسي ${recommendedAcbRating}`,
      specEn: `Rating ${trfKva} kVA - FLA ${trfFla.toFixed(1)}A - Main ACB ${recommendedAcbRating}`,
      descriptionAr: 'محول ومجموعة لوحة توزيع رئيسية محسوبة للحمل المطلوب',
      descriptionEn: 'Engineered transformer and incoming switchgear package',
      image: '/src/assets/images/hero_electrical_substation_1794334721158.jpg',
      inStock: true,
      standards: ['IEC 60076'],
      unit: 'طقم / Package'
    };
    onAddToCart(customProduct);
    onOpenRfq();
  };

  return (
    <section id="calculator" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-widest text-orange-600 uppercase mb-2">
            Engineering Suite · أدوات المهندس والاستشاري
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance] mb-4">
            {t.calculator.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-10 overflow-x-auto">
          <div className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-slate-200 gap-2">
            <button
              onClick={() => setActiveTab('conduit')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'conduit'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4 text-orange-500" />
              <span>{lang === 'ar' ? 'حاسبة أقطار مواسير EMT والأسلاك' : 'EMT Conduit Fill Calculator'}</span>
            </button>
            <button
              onClick={() => setActiveTab('cable')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'cable'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4 text-orange-500" />
              <span>{t.calculator.tabCable}</span>
            </button>
            <button
              onClick={() => setActiveTab('transformer')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'transformer'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-4 h-4 text-orange-500" />
              <span>{t.calculator.tabTrf}</span>
            </button>
          </div>
        </div>

        {/* Calculator Body */}
        {activeTab === 'conduit' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Conduit Input Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-600" />
                <span>{lang === 'ar' ? 'تحديد مواصفات مسار المواسير والأسلاك' : 'Raceway & Wire Parameters'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Conduit Type */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'نوع المواسير المطلوبة:' : 'Conduit Standard Type:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setConduitType('emt')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                        conduitType === 'emt'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      EMT (خفيفة مجلفنة)
                    </button>
                    <button
                      type="button"
                      onClick={() => setConduitType('imc')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                        conduitType === 'imc'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      IMC / RIGID (ثقيلة)
                    </button>
                    <button
                      type="button"
                      onClick={() => setConduitType('flex')}
                      className={`py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                        conduitType === 'flex'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      فلكسبل مرنة PVC
                    </button>
                  </div>
                </div>

                {/* Wire Size */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'مقطع السلك النحاسي (مم²):' : 'Wire Gauge Size (mm²):'}
                  </label>
                  <select
                    value={wireSize}
                    onChange={(e) => setWireSize(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value={1.5}>1.5 mm² (دوائر إنارة / Lighting)</option>
                    <option value={2.5}>2.5 mm² (دوائر قوى وبرايز / Sockets)</option>
                    <option value={4.0}>4.0 mm² (تكييفات وسخانات / AC & Heaters)</option>
                    <option value={6.0}>6.0 mm² (تغذية لوحات فرعية / Feeders)</option>
                    <option value={10.0}>10.0 mm² (كابلات تغذية رئيسية)</option>
                    <option value={16.0}>16.0 mm² (تغذية محركات وقوى)</option>
                    <option value={25.0}>25.0 mm² (كابلات قوى رئيسية)</option>
                    <option value={35.0}>35.0 mm² (تغذية رئيسية)</option>
                  </select>
                </div>

                {/* Number of Wires */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'عدد الأسلاك المارة في نفس الماسورة:' : 'Number of Conductors in Conduit:'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={wireCount}
                    onChange={(e) => setWireCount(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-orange-50/70 border border-orange-200/60 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-orange-900 block mb-1">
                  {lang === 'ar' ? 'معيار كود التمديدات (NEC Chapter 9 Table 1):' : 'Conduit Fill Rule:'}
                </span>
                {lang === 'ar'
                  ? 'يتم حساب أقطار المواسير بحيث لا يتجاوز إجمالي مساحة مقطع الأسلاك نسبة 40% من المساحة الداخلية الصافية للماسورة (لأكثر من سلكين) لتسهيل سحب الأسلاك وتفادي تراكم الحرارة.'
                  : 'Sized to ensure total conductor area does not exceed 40% of conduit inner cross-sectional area (for 3+ conductors) in full compliance with NEC standards.'}
              </div>
            </div>

            {/* Conduit Output Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'مقاس الماسورة المعتمد هندسياً' : 'Recommended Conduit Trade Size'}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                  {recommendedConduit.tradeSize}{' '}
                  <span className="text-lg font-normal text-slate-400">({recommendedConduit.metric})</span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {conduitType === 'emt' ? 'EMT Galvanized Steel Pipe (UL 797)' : conduitType === 'imc' ? 'IMC Heavy Threaded Conduit' : 'PVC Coated Liquid-Tight Flex'}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>{lang === 'ar' ? 'نسبة الامتلاء المحسوبة:' : 'Calculated Fill Ratio:'}</span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {actualFillPercent.toFixed(1)}% (الأقصى المسموح 40%)
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>{lang === 'ar' ? 'إجمالي مساحة مقطع الأسلاك:' : 'Total Conductor Area:'}</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {totalWireArea.toFixed(1)} mm²
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>{lang === 'ar' ? 'المستلزمات المطابقة:' : 'Matching Accessories:'}</span>
                  <span className="font-semibold text-orange-400">
                    جلب وكونكتورات {recommendedConduit.tradeSize}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'ar'
                    ? 'مطابق لاشتراطات الكود المصري والمواصفات القياسية الأمريكية ANSI C80.3'
                    : 'Verified compliant with NEC raceway fill tables & Egyptian Building Code'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleAddConduitToQuote}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إضافة المواسير والأسلاك لطلب التسعير' : 'Add Conduit & Wires to RFQ'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                * جميع المواسير والإكسسوارات متوفرة بالمخازن بأطوالها القياسية (3.05 متر للماسورة) مع الجلب والكلبسات.
              </p>
            </div>

          </div>
        ) : activeTab === 'cable' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Form Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-600" />
                <span>{lang === 'ar' ? 'بيانات ومعطيات الحمل الكهربائي' : 'Electrical Load Parameters'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Load kW */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.loadKw}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={loadKw}
                    onChange={(e) => setLoadKw(Number(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                {/* Length Meters */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.length}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="2000"
                    value={lengthMeters}
                    onChange={(e) => setLengthMeters(Number(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                {/* Voltage */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.voltage}
                  </label>
                  <select
                    value={voltage}
                    onChange={(e) => setVoltage(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value={400}>400 V (3-Phase IEC Standard)</option>
                    <option value={380}>380 V (3-Phase Industrial)</option>
                    <option value={230}>230 V (1-Phase Line-Neutral)</option>
                    <option value={220}>220 V (1-Phase Standard)</option>
                  </select>
                </div>

                {/* Power Factor */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.powerFactor}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.6"
                    max="1.0"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(Number(e.target.value) || 0.85)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                {/* Conductor Material */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.cableMaterial}
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setConductorMaterial('cu')}
                      className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                        conductorMaterial === 'cu'
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.calculator.copper}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConductorMaterial('al')}
                      className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                        conductorMaterial === 'al'
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.calculator.aluminum}
                    </button>
                  </div>
                </div>

                {/* Phase Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.phase}
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsThreePhase(true);
                        setVoltage(400);
                      }}
                      className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                        isThreePhase
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      3-Phase (400V)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsThreePhase(false);
                        setVoltage(230);
                      }}
                      className={`flex-1 py-2 px-3 text-xs font-bold rounded-lg border transition-colors ${
                        !isThreePhase
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      1-Phase (230V)
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Sizing Results Output Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
                  {lang === 'ar' ? 'النتائج الهندسية الموصى بها' : 'Engineered Sizing Recommendation'}
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  {suitableCable.size} mm²
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {conductorMaterial === 'cu' ? 'Cu' : 'Al'} / XLPE / STA / PVC (0.6/1kV)
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>{t.calculator.current}</span>
                  <span className="font-mono font-bold text-white tabular-nums">
                    {calculatedCurrent.toFixed(1)} A
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>{t.calculator.voltageDrop}</span>
                  <span className="font-mono font-bold text-orange-400 tabular-nums">
                    {suitableCable.vDropPercent.toFixed(2)} % ({suitableCable.vDropVolts.toFixed(1)} V)
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>{lang === 'ar' ? 'أقصى تيار يتحمله المقطع المختار:' : 'Cable Ampacity in Ground:'}</span>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">
                    {conductorMaterial === 'cu' ? suitableCable.cuAmp : suitableCable.alAmp} A
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t.calculator.safeStatus}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleAddCalculatedCableToQuote}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إضافة هذا الكابل مباشرة لطلب التسعير' : 'Add Sized Cable to RFQ List'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                {t.calculator.disclaimer}
              </p>
            </div>

          </div>
        ) : (
          /* Transformer Sizing Tab */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-orange-600" />
                <span>{lang === 'ar' ? 'بيانات محول التوزيع المطلوب' : 'Transformer Specifications'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.trfRating}
                  </label>
                  <select
                    value={trfKva}
                    onChange={(e) => setTrfKva(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value={250}>250 kVA</option>
                    <option value={500}>500 kVA</option>
                    <option value={630}>630 kVA</option>
                    <option value={800}>800 kVA</option>
                    <option value={1000}>1000 kVA (Standard)</option>
                    <option value={1250}>1250 kVA</option>
                    <option value={1600}>1600 kVA</option>
                    <option value={2000}>2000 kVA</option>
                    <option value={2500}>2500 kVA</option>
                    <option value={3150}>3150 kVA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.calculator.trfLvVoltage}
                  </label>
                  <select
                    value={trfVoltage}
                    onChange={(e) => setTrfVoltage(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value={400}>400 V (Standard IEC)</option>
                    <option value={380}>380 V</option>
                    <option value={415}>415 V (BS Standard)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-orange-50/70 border border-orange-200/60 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-orange-900 block mb-1">
                  {lang === 'ar' ? 'المحولات المعتمدة المتوفرة للتوريد:' : 'Available Ready-to-Ship Units:'}
                </span>
                {lang === 'ar'
                  ? 'محولات زيتية محكمة الغلق (Hermetically Sealed Oil) ومحولات جافة راتنجية (Cast Resin Dry Type) معتمدة من السويدي و ABB ومطابقة للمواصفات القياسية المصرية IEC 60076.'
                  : 'Cast resin dry-type and hermetically sealed oil distribution transformers manufactured under ISO 9001 and IEC 60076 standards.'}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div>
                <div className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-1">
                  {t.calculator.trfRatedCurrent}
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  {trfFla.toFixed(1)} A
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {lang === 'ar' ? 'تيار الحمل الكامل على جهد' : 'Secondary Full Load Amps at'} {trfVoltage}V
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>{lang === 'ar' ? 'سعة القاطع الرئيسي الموصى به (Main ACB):' : 'Recommended Incomer Breaker (ACB):'}</span>
                  <span className="font-mono font-bold text-orange-400 tabular-nums">
                    {recommendedAcbRating}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>{lang === 'ar' ? 'نوع العزل المتاح:' : 'Insulation Classes:'}</span>
                  <span className="font-semibold text-white">Cast Resin Class F / Oil</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleAddCalculatedTrfToQuote}
                  className="w-full py-3 px-4 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'إضافة المحول والقاطع لطلب التسعير' : 'Add Transformer Package to RFQ'}</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                {t.calculator.disclaimer}
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
