import React, { useState } from 'react';
import { Language } from '../types';
import { content } from '../data/translations';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = content[lang];

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      alert(lang === 'ar' ? 'يرجى استكمال الحقول الإلزامية المطلوبة' : 'Please fill all required fields');
      return;
    }

    // Prepare email action
    const mailto = `mailto:amg.group4supplies@gmail.com?subject=${encodeURIComponent(
      `استفسار توريدات: ${form.subject || form.name} - ${form.company}`
    )}&body=${encodeURIComponent(
      `الاسم: ${form.name}\nالشركة: ${form.company}\nالهاتف: ${form.phone}\nالبريد: ${form.email}\n\nنص الرسالة:\n${form.message}`
    )}`;

    setIsSuccess(true);
    setTimeout(() => {
      window.location.href = mailto;
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold tracking-widest text-orange-600 uppercase mb-2">
            Get In Touch · التواصل المباشر
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance] mb-4">
            {t.contact.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Info Details Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-100 text-orange-600 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t.contact.emailLabel}
                </div>
                <a
                  href="mailto:amg.group4supplies@gmail.com"
                  className="text-base sm:text-lg font-bold text-slate-900 hover:text-orange-600 transition-colors break-all"
                >
                  amg.group4supplies@gmail.com
                </a>
                <div className="text-xs text-slate-500 mt-1">
                  {lang === 'ar' ? 'استقبال كراسات الشروط وطلبات الأسعار 24/7' : '24/7 RFQ & Technical Tender Inquiries'}
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t.contact.phoneLabel}
                </div>
                <a
                  href="tel:+201008924110"
                  className="text-base sm:text-lg font-mono font-bold text-slate-900 hover:text-orange-600 transition-colors block"
                  dir="ltr"
                >
                  +20 100 892 4110
                </a>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href="https://wa.me/201008924110"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'محادثة واتساب مبيعات' : 'WhatsApp Direct Chat'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Logistics Network Card */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-100 text-slate-700 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {t.contact.addressLabel}
                </div>
                <div className="text-sm font-bold text-slate-900 mb-1">
                  {t.brand.address}
                </div>
                <div className="text-xs text-slate-500 leading-relaxed">
                  {lang === 'ar'
                    ? 'توريد ميداني مباشر للمناطق الصناعية (العاشر من رمضان، 6 أكتوبر، السادات، السخنة، برج العرب، قنا، بني سويف).'
                    : 'Direct logistics delivery to industrial zones across Egypt.'}
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold block text-white">{lang === 'ar' ? 'ساعات العمل الرسمية:' : 'Office Working Hours:'}</span>
                <span className="text-slate-300">{t.brand.hours}</span>
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              {lang === 'ar' ? 'إرسال طلب توريد أو استفسار فني' : 'Submit Supply Inquiry or Technical Request'}
            </h3>

            {isSuccess ? (
              <div className="py-10 text-center space-y-4 bg-emerald-50/60 rounded-xl border border-emerald-200 p-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">{t.contact.formSuccess}</h4>
                <p className="text-xs text-slate-600">
                  {lang === 'ar'
                    ? 'تم توجيه طلبك للإيميل الرسمي amg.group4supplies@gmail.com'
                    : 'Your request is routed to amg.group4supplies@gmail.com'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg"
                >
                  {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.formName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={lang === 'ar' ? 'الاسم' : 'Full Name'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.formCompany}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder={lang === 'ar' ? 'اسم المؤسسة / المقاول' : 'Company Name'}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.formPhone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="010XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.contact.formEmail}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="engineer@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.contact.formSubject}
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder={lang === 'ar' ? 'مثال: طلب تسعير كابلات قوى لمصنع بالعبور' : 'E.g., Low voltage switchgear supply tender'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.contact.formMessage} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={lang === 'ar' ? 'اكتب تفاصيل احتياجك الفني، الكميات، أو رقم المناقصة...' : 'Details of equipment, quantities, delivery schedule...'}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-orange-600 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.formSend}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
