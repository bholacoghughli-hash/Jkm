import React, { useState } from 'react';
import { UserPlus, Search, Filter, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sampleAdmissions } from '../../data/sampleData';
import { filterBySearchTerm } from '../../utils/erpCalculations';
import { AdmissionRecord } from '../../types';

export const RecentAdmissions: React.FC = () => {
  const { t, setActiveModule, setIsQuickActionOpen, setQuickActionType } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<AdmissionRecord | null>(null);

  // Filter admissions
  let filtered = filterBySearchTerm(sampleAdmissions, localSearch, [
    'studentName',
    'enrollmentNo',
    'classGrade',
    'parentName',
  ]);

  if (filterStatus !== 'all') {
    filtered = filtered.filter((adm) => adm.status === filterStatus);
  }

  const getStatusBadge = (status: AdmissionRecord['status']) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </span>
        );
      case 'Pending Verification':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            <Clock className="h-3 w-3" />
            Verification
          </span>
        );
      case 'Document Required':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
            <AlertTriangle className="h-3 w-3" />
            Doc Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              {t('sectionRecentAdmissions')}
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {t('sampleDataPill')}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('sectionRecentAdmissionsDesc')}
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setQuickActionType('admission');
              setIsQuickActionOpen(true);
            }}
            className="flex items-center gap-1 rounded-lg bg-blue-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-800 active:scale-95 transition"
          >
            <span>{t('btnNewAdmission')}</span>
          </button>
        </div>
      </div>

      {/* Filter and local search bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 my-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Filter by name, class, enrollment #..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Status:</span>
          {['all', 'Approved', 'Pending Verification', 'Document Required'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`rounded-md px-2 py-1 text-[11px] font-medium transition ${
                filterStatus === st
                  ? 'bg-blue-900 text-white dark:bg-blue-600'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {st === 'all' ? 'All' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Admissions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
            <tr>
              <th className="px-3 py-2.5 rounded-l-lg">{t('thEnrollmentNo')}</th>
              <th className="px-3 py-2.5">{t('thStudentName')}</th>
              <th className="px-3 py-2.5">{t('thClass')}</th>
              <th className="px-3 py-2.5">{t('thParentName')}</th>
              <th className="px-3 py-2.5">{t('thAdmissionDate')}</th>
              <th className="px-3 py-2.5">{t('thStatus')}</th>
              <th className="px-3 py-2.5 text-right rounded-r-lg">{t('thAction')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-slate-400">
                  {t('noDataFound')}
                </td>
              </tr>
            ) : (
              filtered.map((adm) => (
                <tr
                  key={adm.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-3 py-3 font-mono font-medium text-blue-900 dark:text-blue-300">
                    {adm.enrollmentNo}
                  </td>
                  <td className="px-3 py-3 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        {adm.studentName.charAt(0)}
                      </div>
                      <span>{adm.studentName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">{adm.classGrade}</td>
                  <td className="px-3 py-3">
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        {adm.parentName}
                      </span>
                      <span className="block text-[10px] text-slate-400 font-mono">
                        {adm.contact}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">{adm.admissionDate}</td>
                  <td className="px-3 py-3">{getStatusBadge(adm.status)}</td>
                  <td className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedStudent(adm)}
                      className="rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {t('btnViewDetails')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-900 font-bold dark:bg-blue-950 dark:text-blue-300">
                  {selectedStudent.studentName.charAt(0)}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {selectedStudent.studentName}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400">
                    {selectedStudent.enrollmentNo}
                  </span>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800">
                {t('sampleDataPill')}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Class & Section:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.classGrade}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Parent / Guardian:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.parentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Contact Number:</span>
                <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{selectedStudent.contact}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-400">Admission Date:</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{selectedStudent.admissionDate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Application Status:</span>
                <div>{getStatusBadge(selectedStudent.status)}</div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
              >
                {t('btnClose')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          Showing {filtered.length} of {sampleAdmissions.length} recent admission applications
        </span>
        <button
          type="button"
          onClick={() => setActiveModule('admissions')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
        >
          <span>{t('btnViewDetails')}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
