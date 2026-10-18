import React, { useState } from 'react';
import {
  X,
  CreditCard,
  ClipboardCheck,
  UserPlus,
  Megaphone,
  CheckCircle2,
  AlertCircle,
  Printer,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrencyINR } from '../../utils/erpCalculations';

export const QuickActionModal: React.FC = () => {
  const {
    isQuickActionOpen,
    setIsQuickActionOpen,
    quickActionType,
    setQuickActionType,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'fee' | 'attendance' | 'admission' | 'notice'>(
    quickActionType || 'fee'
  );

  // Sync tab with external trigger
  React.useEffect(() => {
    if (quickActionType) {
      setActiveTab(quickActionType);
    }
  }, [quickActionType]);

  // Fee Form State
  const [feeStudent, setFeeStudent] = useState('Aarav Sharma (Class 10A)');
  const [feeAmount, setFeeAmount] = useState('4500');
  const [feeMode, setFeeMode] = useState('UPI');
  const [feeSuccessReceipt, setFeeSuccessReceipt] = useState<string | null>(null);

  // Attendance Form State
  const [attClass, setAttClass] = useState('Class 10 - Section A');
  const [attPresent, setAttPresent] = useState(38);
  const [attTotal, setAttTotal] = useState(40);
  const [attSaved, setAttSaved] = useState(false);

  // Admission Form State
  const [admName, setAdmName] = useState('');
  const [admClass, setAdmClass] = useState('Nursery');
  const [admParent, setAdmParent] = useState('');
  const [admPhone, setAdmPhone] = useState('');
  const [admSuccess, setAdmSuccess] = useState(false);

  // Notice Form State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeAudience, setNoticeAudience] = useState('All Parents & Students');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  if (!isQuickActionOpen) return null;

  const handleClose = () => {
    setIsQuickActionOpen(false);
    setQuickActionType(null);
    setFeeSuccessReceipt(null);
    setAttSaved(false);
    setAdmSuccess(false);
    setNoticeSuccess(false);
  };

  const handleRecordFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeAmount || Number(feeAmount) <= 0) return;
    const generatedReceipt = `JKM-REC-20261018-${Math.floor(1000 + Math.random() * 9000)}`;
    setFeeSuccessReceipt(generatedReceipt);
  };

  const handleSaveAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    setAttSaved(true);
  };

  const handleSaveAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!admName || !admPhone) return;
    setAdmSuccess(true);
  };

  const handleBroadcastNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle) return;
    setNoticeSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-white font-black text-xs">
              JK
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t('quickActionBtn')} • Phase 1
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Interactive workflow prototype for testing ERP actions
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 pt-2 dark:border-slate-800 dark:bg-slate-950/40">
          {[
            { id: 'fee', label: t('btnRecordFee'), icon: CreditCard },
            { id: 'attendance', label: t('btnMarkAttendance'), icon: ClipboardCheck },
            { id: 'admission', label: t('btnNewAdmission'), icon: UserPlus },
            { id: 'notice', label: t('btnSendNotice'), icon: Megaphone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setFeeSuccessReceipt(null);
                  setAttSaved(false);
                  setAdmSuccess(false);
                  setNoticeSuccess(false);
                }}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition ${
                  isActive
                    ? 'border-blue-900 text-blue-950 dark:border-blue-500 dark:text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-900 dark:text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* TAB 1: FEE COLLECTION */}
          {activeTab === 'fee' && (
            <div>
              {feeSuccessReceipt ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="mt-2 text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    Fee Receipt Generated Successfully!
                  </h4>
                  <p className="mt-1 font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Receipt #: {feeSuccessReceipt}
                  </p>
                  <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
                    Amount: {formatCurrencyINR(Number(feeAmount))} • Mode: {feeMode} • Student: {feeStudent}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFeeSuccessReceipt(null)}
                      className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                    >
                      Record Another Fee
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRecordFee} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Student / Scholar (Sample Roster)
                    </label>
                    <select
                      value={feeStudent}
                      onChange={(e) => setFeeStudent(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Aarav Sharma (Class 10A - Roll 1001)">Aarav Sharma (Class 10A - Roll 1001)</option>
                      <option value="Shaurya Singh (Class 1A - Roll 102)">Shaurya Singh (Class 1A - Roll 102)</option>
                      <option value="Ananya Mishra (Class 6B - Roll 615)">Ananya Mishra (Class 6B - Roll 615)</option>
                      <option value="Divyansh Gautam (Class 11 Sci - Roll 1104)">Divyansh Gautam (Class 11 Sci - Roll 1104)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Amount to Collect (₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={feeAmount}
                        onChange={(e) => setFeeAmount(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono font-bold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                        placeholder="e.g. 4500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Payment Mode
                      </label>
                      <select
                        value={feeMode}
                        onChange={(e) => setFeeMode(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="UPI">UPI / QR Code</option>
                        <option value="Cash">Cash at Counter</option>
                        <option value="Cheque">Bank Cheque</option>
                        <option value="NetBanking">Net Banking / NEFT</option>
                      </select>
                    </div>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-2.5 text-[11px] text-blue-900 dark:bg-blue-950/50 dark:text-blue-300 flex items-start gap-2">
                    <Sparkles className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                    <span>In Phase 2, this triggers an atomic MySQL transaction with 80G compliant thermal receipt and SMS dispatch to the parent.</span>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
                    >
                      {t('btnClose')}
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-900 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-blue-800 active:scale-95 transition"
                    >
                      Generate Receipt & Confirm
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div>
              {attSaved ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="mt-2 text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    Attendance Marked for {attClass}!
                  </h4>
                  <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                    {attPresent} Present, {attTotal - attPresent} Absent (Attendance Rate: {((attPresent / attTotal) * 100).toFixed(1)}%)
                  </p>
                  <button
                    type="button"
                    onClick={() => setAttSaved(false)}
                    className="mt-4 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                  >
                    Mark Another Class
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveAttendance} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Class & Section
                    </label>
                    <select
                      value={attClass}
                      onChange={(e) => setAttClass(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Class 10 - Section A">Class 10 - Section A (40 Students)</option>
                      <option value="Class 10 - Section B">Class 10 - Section B (38 Students)</option>
                      <option value="Class 12 - Science">Class 12 - Science (35 Students)</option>
                      <option value="Nursery - Rose">Nursery - Rose (25 Students)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                      <span className="text-xs text-slate-500">Present Count</span>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() => setAttPresent(Math.max(0, attPresent - 1))}
                          className="h-7 w-7 rounded bg-slate-100 font-bold dark:bg-slate-800"
                        >
                          -
                        </button>
                        <span className="font-mono text-base font-bold text-slate-800 dark:text-white">
                          {attPresent}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAttPresent(Math.min(attTotal, attPresent + 1))}
                          className="h-7 w-7 rounded bg-slate-100 font-bold dark:bg-slate-800"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                      <span className="text-xs text-slate-500">Total Enrolled</span>
                      <p className="font-mono text-base font-bold text-slate-800 dark:text-white mt-1">
                        {attTotal} Students
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
                    >
                      {t('btnClose')}
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-900 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-blue-800"
                    >
                      Submit Daily Attendance
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: NEW ADMISSION */}
          {activeTab === 'admission' && (
            <div>
              {admSuccess ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="mt-2 text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    Inquiry Registered: {admName}!
                  </h4>
                  <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                    Application assigned to {admClass}. Inquiry tracking code: JKM-INQ-2026-921.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAdmSuccess(false);
                      setAdmName('');
                      setAdmParent('');
                      setAdmPhone('');
                    }}
                    className="mt-4 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                  >
                    Register Another Candidate
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveAdmission} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={admName}
                      onChange={(e) => setAdmName(e.target.value)}
                      placeholder="e.g. Advait Gautam"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Class Sought
                      </label>
                      <select
                        value={admClass}
                        onChange={(e) => setAdmClass(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Nursery">Nursery</option>
                        <option value="LKG">LKG</option>
                        <option value="UKG">UKG</option>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 6">Class 6</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 11 Science">Class 11 Science</option>
                        <option value="Class 11 Commerce">Class 11 Commerce</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Parent Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        value={admPhone}
                        onChange={(e) => setAdmPhone(e.target.value)}
                        placeholder="+91 98380 XXXXX"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Parent / Guardian Name
                    </label>
                    <input
                      type="text"
                      value={admParent}
                      onChange={(e) => setAdmParent(e.target.value)}
                      placeholder="e.g. Ramesh Kumar Gautam"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
                    >
                      {t('btnClose')}
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-900 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-blue-800"
                    >
                      Save Admission Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: BROADCAST NOTICE */}
          {activeTab === 'notice' && (
            <div>
              {noticeSuccess ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center dark:border-emerald-900/50 dark:bg-emerald-950/30">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="mt-2 text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    Notice Broadcast Queued!
                  </h4>
                  <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
                    "{noticeTitle}" scheduled for transmission to {noticeAudience}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNoticeSuccess(false);
                      setNoticeTitle('');
                      setNoticeContent('');
                    }}
                    className="mt-4 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
                  >
                    Draft Another Notice
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBroadcastNotice} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Circular / Notice Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                      placeholder="e.g. Schedule for Half-Yearly Assessments"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Target Audience
                    </label>
                    <select
                      value={noticeAudience}
                      onChange={(e) => setNoticeAudience(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="All Parents & Students">All Parents & Students (Nursery to 12th)</option>
                      <option value="Senior Wing (Classes 9 to 12)">Senior Wing (Classes 9 to 12)</option>
                      <option value="Primary Wing (Nursery to 5th)">Primary Wing (Nursery to 5th)</option>
                      <option value="Teaching & Support Staff Only">Teaching & Support Staff Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Notice Content
                    </label>
                    <textarea
                      rows={3}
                      value={noticeContent}
                      onChange={(e) => setNoticeContent(e.target.value)}
                      placeholder="Enter detailed notification instructions..."
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300"
                    >
                      {t('btnClose')}
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-900 px-4 py-1.5 text-xs font-bold text-white shadow hover:bg-blue-800"
                    >
                      Broadcast Circular
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
