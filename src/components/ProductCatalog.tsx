import React, { useState, useMemo } from 'react';
import { Product, Language } from '../types';
import { productsData } from '../data/products';
import { content } from '../data/translations';
import { Search, Plus, Check, Info, FileText, ChevronRight, X } from 'lucide-react';

interface ProductCatalogProps {
  lang: Language;
  onAddToCart: (product: Product, quantity?: number) => void;
  cartProductIds: string[];
  onOpenRfq: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  lang,
  onAddToCart,
  cartProductIds,
  onOpenRfq
}) => {
  const t = content[lang];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedTempId, setAddedTempId] = useState<string | null>(null);

  // Categories list
  const categories = useMemo(() => {
    return [
      { id: 'all', label: t.catalog.all },
      { id: 'emt_conduits', label: lang === 'ar' ? 'مواسير EMT & IMC' : 'EMT & IMC Conduits' },
      { id: 'flexible_conduits', label: lang === 'ar' ? 'مواسير فلكسبل مرنة' : 'Flexible Conduits' },
      { id: 'boxes_fittings', label: lang === 'ar' ? 'بواطات وإكسسوارات' : 'Boxes & Fittings' },
      { id: 'earthing', label: lang === 'ar' ? 'أنظمة التأريض والصواعق' : 'Earthing & Lightning' },
      { id: 'cables', label: lang === 'ar' ? 'كابلات وأسلاك' : 'Cables & Wires' },
      { id: 'switchgear', label: lang === 'ar' ? 'قواطع ولوحات توزيع' : 'Switchgears & Panels' },
      { id: 'automation', label: lang === 'ar' ? 'أتمتة وتحكم صناعي' : 'Automation & VFDs' },
      { id: 'cable_tray', label: lang === 'ar' ? 'كابل تري ومسارات' : 'Cable Trays' },
      { id: 'lighting', label: lang === 'ar' ? 'إنارة صناعية' : 'Industrial Lighting' },
    ];
  }, [lang, t.catalog.all]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return productsData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.nameAr.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.specAr.toLowerCase().includes(q) ||
        item.specEn.toLowerCase().includes(q) ||
        item.standards.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleAdd = (product: Product) => {
    onAddToCart(product, 1);
    setAddedTempId(product.id);
    setTimeout(() => setAddedTempId(null), 1800);
  };

  return (
    <section id="products" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold tracking-widest text-orange-600 uppercase mb-2">
            AMG Supplies Portfolio · كتالوج التوريدات المعتمدة
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance] mb-4">
            {t.catalog.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute top-1/2 -translate-y-1/2 left-4 rtl:left-auto rtl:right-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              className="w-full pl-12 pr-4 rtl:pl-4 rtl:pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 right-4 rtl:right-auto rtl:left-4 text-xs text-slate-400 hover:text-slate-700"
              >
                مسح / Clear
              </button>
            )}
          </div>

          {/* Interactive Category Segmented Tabs (Functional Buttons) */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto py-2 px-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
            <Info className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">{t.catalog.noResults}</h3>
            <p className="text-sm text-slate-500 mb-6">{t.catalog.requestCustom}</p>
            <button
              onClick={onOpenRfq}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
            >
              <span>{lang === 'ar' ? 'طلب تسعير بمواصفة خاصة' : 'Submit Custom Spec RFQ'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedTempId === product.id || cartProductIds.includes(product.id);
              const productName = lang === 'ar' ? product.nameAr : product.nameEn;
              const productDesc = lang === 'ar' ? product.descriptionAr : product.descriptionEn;
              const productSpec = lang === 'ar' ? product.specAr : product.specEn;

              return (
                <div
                  key={product.id}
                  className="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
                >
                  {/* Image Container with Fallback */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={productName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Brand Watermark on Image */}
                    <div className="absolute bottom-2.5 left-2.5 rtl:left-auto rtl:right-2.5 px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-xs text-[11px] font-bold text-white">
                      {product.brand}
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean Unboxed Metadata Line (NO PILLS) */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                        <span className="text-orange-600 font-semibold">
                          {lang === 'ar' ? product.categoryAr : product.categoryEn}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{t.catalog.inStock}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                        {productName}
                      </h3>

                      {/* Technical Spec Box */}
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 font-mono mb-3 leading-relaxed">
                        <div className="text-[10px] text-slate-400 font-sans font-bold uppercase mb-0.5">
                          {t.catalog.spec}
                        </div>
                        {productSpec}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {productDesc}
                      </p>

                      {/* Standards List (Clean unboxed inline list) */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 font-mono mb-4">
                        <span className="font-sans text-slate-400">{t.catalog.standards}</span>
                        {product.standards.map((std, i) => (
                          <span key={std}>
                            {std}
                            {i < product.standards.length - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>{t.catalog.details}</span>
                      </button>

                      <button
                        onClick={() => handleAdd(product)}
                        className={`inline-flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.catalog.addedToQuote}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t.catalog.addToQuote}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom RFQ Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-start">
            <h3 className="text-lg font-bold text-white">
              {lang === 'ar' ? 'لديك مقايسة أو جدول كميات كامل (BoQ)؟' : 'Have a project Bill of Quantities (BoQ)?'}
            </h3>
            <p className="text-sm text-slate-300">
              {lang === 'ar'
                ? 'أرسل لنا بنود المشروع وسيقوم قسم المبيعات الفنية بتسعيرها وتوفير بدائل معتمدة خلال ساعات.'
                : 'Upload your equipment schedule or procurement list for rapid turnkey estimation.'}
            </p>
          </div>
          <button
            onClick={onOpenRfq}
            className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-md shadow-orange-600/30 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>{lang === 'ar' ? 'رفع جدول الكميات والطلب' : 'Submit Project BoQ'}</span>
          </button>
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="aspect-16/9 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.nameEn}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-xs font-semibold text-orange-600 mb-1">
                  {selectedProduct.brand} · {lang === 'ar' ? selectedProduct.categoryAr : selectedProduct.categoryEn}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lang === 'ar' ? selectedProduct.descriptionAr : selectedProduct.descriptionEn}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase">
                  {lang === 'ar' ? 'المواصفات الفنية التفصيلية' : 'Detailed Technical Specification'}
                </div>
                <div className="text-sm font-mono text-slate-700">
                  {lang === 'ar' ? selectedProduct.specAr : selectedProduct.specEn}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-900 uppercase mb-2">
                  {lang === 'ar' ? 'شهادات واعتمادات الجودة:' : 'Certifications & Standards:'}
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-700">
                  {selectedProduct.standards.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  {lang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    handleAdd(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm"
                >
                  {t.catalog.addToQuote}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
