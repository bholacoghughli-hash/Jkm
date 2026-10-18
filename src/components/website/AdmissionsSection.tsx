import React, { useState } from 'react';
import {
  UserPlus,
  FileCheck2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Send,
  Sparkles,
  Info,
  Clock,
  Phone,
  School,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdmissionsSection: React.FC = () => {
  const { t } = useApp();

  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [targetClass, setTargetClass] = useState('Nursery');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const steps = [
    { title: t('admStep1Title'), desc: t('admStep1Desc'), num: '1' },
    { title: t('admStep2Title'), desc: t('admStep2Desc'), num: '2' },
    { title: t('admStep3Title'), desc: t('admStep3Desc'), num: '3' },
    { title: t('admStep4Title'), desc: t('admStep4Desc'), num: '4' },
  ];

  const documents = [
    t('admDoc1'),
    t('admDoc2'),
    t('admDoc3'),
    t('admDoc4'),
    t('admDoc5'),
  ];

  const classOptions = [
    'Nursery (Age 3+)',
    'LKG (Age 4+)',
    'UKG (Age 5+)',
    'Class 1 (Age 6+)',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9 (High School)',
    'Class 10',
    'Class 11 (Science)',
    'Class 11 (Commerce)',
    'Class 11 (Arts)',
    'Class 12',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentName.trim() || !contactPhone.trim()) {
      setFormError('Please fill in student name, parent/guardian name, and contact number.');
      return;
    }

    setFormError(null);
    setIsSubmitted(true);
  };

  return (
    <section id="admissions" className="py-16 lg:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>{t('admBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            {t('admTitle')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('admSubtitle')}
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, sIdx) => (
            <div
              key={sIdx}
              className="relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-amber-300 font-extrabold text-sm shadow-sm">
                  {st.num}
                </div>
                <h4 className="font-bold text-base text-blue-950 dark:text-white">
                  {st.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2-Column: Required Documents & Admission Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols): Documents Checklist & Honest Fee Note */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <FileCheck2 className="h-5 w-5 text-blue-900 dark:text-blue-300" />
                <h3 className="font-extrabold text-base text-blue-950 dark:text-white">
                  {t('admDocsTitle')}
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                {documents.map((doc, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Honest Fee Notice Box */}
            <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5 dark:border-amber-900/50 dark:bg-amber-950/30 text-xs text-amber-950 dark:text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <Info className="h-4 w-4 text-amber-600 shrink-0" />
                <span>Notice on Official Fee Structures</span>
              </div>
              <p className="leading-relaxed opacity-90 font-normal">
                {t('admNoticeHonestFee')}
              </p>
              <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] font-semibold text-amber-900 dark:text-amber-300">
                School Office: Subhash Chowk, Block Ghughli, Maharajganj (UP)
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Interactive Admission Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-md">
              <div className="space-y-1 mb-6">
                <h3 className="text-lg font-bold text-blue-950 dark:text-white">
                  {t('admFormTitle')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t('admFormSubtitle')}
                </p>
              </div>

              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/40 text-center space-y-3 animate-fade-in">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
                    {t('admSuccessMsg')}
                  </h4>
                  <p className="text-xs text-emerald-900 dark:text-emerald-300 max-w-md mx-auto leading-relaxed">
                    {t('admSuccessDesc')}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setStudentName('');
                      setParentName('');
                      setContactPhone('');
                      setNotes('');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3.5 py-1.5 text-xs font-bold text-emerald-900 hover:bg-emerald-50 shadow-xs"
                  >
                    <span>Submit Another Inquiry</span>
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
                        {t('admFieldName')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t('admFieldParent')} *
                      </label>
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t('admFieldPhone')} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="e.g. 98XXXXXXXX"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        {t('admFieldClass')} *
                      </label>
                      <select
                        value={targetClass}
                        onChange={(e) => setTargetClass(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-medium"
                      >
                        {classOptions.map((cls, idx) => (
                          <option key={idx} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {t('admFieldMsg')}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Mention any prior school, specific interests, or questions for our counseling team..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 px-3 text-xs text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-3 text-xs font-bold text-white shadow-md hover:from-blue-800 hover:to-indigo-800 active:scale-95 transition"
                  >
                    <Send className="h-4 w-4" />
                    <span>{t('admBtnSubmit')}</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                    Note: Submitting this form creates a preliminary record for our Ghughli administrative office. Official confirmation takes place upon document verification.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
