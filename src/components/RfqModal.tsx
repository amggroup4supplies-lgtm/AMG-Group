import React, { useState } from 'react';
import { Language, RfqItem } from '../types';
import { content } from '../data/translations';
import { X, Trash2, Send, Mail, CheckCircle2, FileText, ShoppingBag, Plus, Minus, Printer } from 'lucide-react';

interface RfqModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  items: RfqItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  lang,
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const t = content[lang];

  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    phone: '',
    email: '',
    projectLocation: '',
    projectType: 'industrial',
    urgency: 'immediate',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitMode, setSubmitMode] = useState<'whatsapp' | 'email' | null>(null);

  if (!isOpen) return null;

  const generateSummaryText = () => {
    let text = `*طلب تسعير جديد من موقع AMG Group*\n`;
    text += `------------------------------------\n`;
    text += `👤 *العميل:* ${formData.clientName || 'غير محدد'}\n`;
    text += `🏢 *الشركة:* ${formData.companyName || 'غير محدد'}\n`;
    text += `📞 *الهاتف:* ${formData.phone || 'غير محدد'}\n`;
    if (formData.email) text += `✉️ *البريد:* ${formData.email}\n`;
    text += `📍 *الموقع:* ${formData.projectLocation || 'غير محدد'}\n`;
    text += `⏳ *الأولوية:* ${formData.urgency}\n\n`;

    if (items.length > 0) {
      text += `📦 *البنود والمعدات المطلوبة:*\n`;
      items.forEach((item, index) => {
        const pName = lang === 'ar' ? item.product.nameAr : item.product.nameEn;
        text += `${index + 1}. ${pName} (${item.product.brand})\n   الكمية: ${item.quantity} ${item.product.unit}\n`;
      });
      text += `\n`;
    }

    if (formData.notes) {
      text += `📝 *ملاحظات ومواصفات إضافية (BoQ):*\n${formData.notes}\n`;
    }

    return text;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.phone) {
      alert(lang === 'ar' ? 'يرجى كتابة الاسم ورقم الهاتف على الأقل.' : 'Please enter your name and phone number.');
      return;
    }

    const summary = generateSummaryText();
    const encoded = encodeURIComponent(summary);
    // User's WhatsApp: 201008924110
    const waUrl = `https://wa.me/201008924110?text=${encoded}`;
    
    setSubmitted(true);
    setSubmitMode('whatsapp');
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.phone) {
      alert(lang === 'ar' ? 'يرجى كتابة الاسم ورقم الهاتف على الأقل.' : 'Please enter your name and phone number.');
      return;
    }

    const summary = generateSummaryText();
    const subject = encodeURIComponent(`طلب عرض أسعار - ${formData.companyName || formData.clientName} - AMG Group`);
    const body = encodeURIComponent(summary);
    const mailtoUrl = `mailto:amg.group4supplies@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setSubmitMode('email');
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-600/20 text-orange-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {t.quoteModal.title}
              </h2>
              <p className="text-xs text-slate-300">
                {t.quoteModal.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="طباعة / Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {lang === 'ar' ? 'تم تجهيز طلب عرض الأسعار بنجاح!' : 'Quotation Request Prepared!'}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {submitMode === 'whatsapp'
                  ? (lang === 'ar' ? 'تم فتح تطبيق واتساب لإرسال بيانات طلبك مباشرة لمهندس مبيعات AMG Group.' : 'WhatsApp opened to dispatch your inquiry directly to AMG Group sales engineers.')
                  : (lang === 'ar' ? 'تم فتح برنامج البريد الإلكتروني لإرسال الطلب إلى amg.group4supplies@gmail.com' : 'Email client opened to amg.group4supplies@gmail.com')}
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClearCart();
                    onClose();
                  }}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  {t.quoteModal.close}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Selected Items Box */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {t.quoteModal.selectedItems} ({items.length})
                  </h3>
                  {items.length > 0 && (
                    <button
                      onClick={onClearCart}
                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                    >
                      {t.quoteModal.clearCart}
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
                    {t.quoteModal.noItems}
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    {items.map((item) => {
                      const pName = lang === 'ar' ? item.product.nameAr : item.product.nameEn;
                      return (
                        <div key={item.product.id} className="p-3.5 bg-white flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate">
                              {pName}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {item.product.brand} · {item.product.unit}
                            </div>
                          </div>

                          {/* Quantity control */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-slate-900 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 ml-1 rtl:ml-0 rtl:mr-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Client & Project Details Form */}
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.quoteModal.clientName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder={lang === 'ar' ? 'م/ أحمد محمود' : 'Eng. John Doe'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.quoteModal.companyName}
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={lang === 'ar' ? 'شركة المقاولات أو المصنع' : 'Contracting Co. / Plant'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.quoteModal.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.quoteModal.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.quoteModal.projectLocation}
                    </label>
                    <input
                      type="text"
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      placeholder={lang === 'ar' ? 'العاشر من رمضان / السادات / العاصمة' : 'Cairo, Alexandria, 10th of Ramadan'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.quoteModal.urgency}
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    >
                      <option value="immediate">{t.quoteModal.urgencyOptions.immediate}</option>
                      <option value="standard">{t.quoteModal.urgencyOptions.standard}</option>
                      <option value="tender">{t.quoteModal.urgencyOptions.tender}</option>
                    </select>
                  </div>
                </div>

                {/* BoQ Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.quoteModal.notes}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t.quoteModal.notesPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                  />
                </div>

                {/* Submission Action Buttons */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="flex-1 py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t.quoteModal.submitWhatsApp}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="flex-1 py-3 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-orange-600 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{t.quoteModal.submitEmail}</span>
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-500">
                  {lang === 'ar'
                    ? 'سيتم استلام الطلب مباشرة من قبل إدارة مبيعات وتوريدات AMG Group والتواصل معك لتأكيد الأسعار وتوافر المخزون.'
                    : 'Your inquiry goes straight to the AMG Group engineering procurement desk.'}
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
