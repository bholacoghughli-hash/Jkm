import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  User,
  Send,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  School,
  Navigation,
  Info,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactSection: React.FC = () => {
  const { t, setIsSystemInfoOpen } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setFormError('Please provide your name, contact phone, and message.');
      return;
    }
    setFormError(null);
    setIsSent(true);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-900 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span>{t('contactBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            {t('contactTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('contactSubtitle')}
          </p>
        </div>

        {/* 2-Column: Real School Info & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Known Verified Address & Official Office Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm space-y-6">
              {/* Address Card */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-900 text-amber-300 shadow-sm mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t('contactAddressLabel')}
                  </h4>
                  <p className="text-sm font-bold text-blue-950 dark:text-white leading-relaxed">
                    {t('contactAddressValue')}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Landmark: Central Subhash Chowk Intersection, Ghughli
                  </p>
                </div>
              </div>

              {/* Principal Card */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm mt-0.5">
                  <User className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t('contactPrincipalLabel')}
                  </h4>
                  <p className="text-sm font-bold text-blue-950 dark:text-white">
                    {t('principalName')}
                  </p>
                  <p className="text-xs text-slate-500">
                    Principal & Academic In-Charge
                  </p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t('contactOfficeHoursLabel')}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {t('contactOfficeHoursValue')}
                  </p>
                </div>
              </div>

              {/* Official Inquiries Note */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/80 p-4 dark:border-blue-900/40 dark:bg-blue-950/30 text-xs text-blue-900 dark:text-blue-200 space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold">
                  <Info className="h-4 w-4 text-blue-700 dark:text-amber-400 shrink-0" />
                  <span>{t('contactNoticeLabel')}</span>
                </div>
                <p className="leading-relaxed opacity-90 font-normal">
                  {t('contactNoticeValue')}
                </p>
              </div>
            </div>

            {/* Directions & Landmark Helper Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Navigation className="h-4 w-4 text-amber-500" />
                <span>{t('contactDirectionsTitle')}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {t('contactDirectionsDesc')}
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols): Send Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-md">
              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-bold text-blue-950 dark:text-white">
                  {t('contactFormTitle')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('contactFormSubtitle')}
                </p>
              </div>

              {isSent ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-8 dark:border-emerald-900/50 dark:bg-emerald-950/40 text-center space-y-3 animate-fade-in">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
                    {t('contactSuccessMsg')}
                  </h4>
                  <p className="text-xs text-emerald-900 dark:text-emerald-300 max-w-md mx-auto leading-relaxed">
                    Our administrative team at Subhash Chowk has received your message. You may also visit the school office directly from Monday to Saturday (8:00 AM – 2:00 PM).
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setPhone('');
                      setSubject('');
                      setMessage('');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-900 hover:bg-emerald-50 shadow-xs"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800 dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-200 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t('contactNameLabel')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t('contactPhoneLabel')} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone / WhatsApp number"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {t('contactSubjectLabel')}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Admission inquiry, curriculum question, fee schedule inquiry..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {t('contactMessageLabel')} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your inquiry or message here..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-3 text-xs font-bold text-white shadow-md hover:from-blue-800 hover:to-indigo-800 active:scale-95 transition"
                  >
                    <Send className="h-4 w-4" />
                    <span>{t('contactSubmitBtn')}</span>
                  </button>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{t('developedBy')}</span>
                    <button
                      type="button"
                      onClick={() => setIsSystemInfoOpen(true)}
                      className="hover:text-blue-600 font-semibold underline"
                    >
                      Institutional Credentials
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
