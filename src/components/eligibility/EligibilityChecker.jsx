import React, { useState, useMemo } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Building2,
  Info,
  User,
  Briefcase
} from 'lucide-react';
import { checkEligibility } from '../../services/checkEligibility';

// Icon for each criterion
const CRITERION_ICONS = {
  cgpa:     GraduationCap,
  backlogs: BookOpen,
  branch:   Building2,
};

// ── Criterion Card ─────────────────────────────────────────────────────────
const CriterionCard = ({ criterion }) => {
  const Icon = CRITERION_ICONS[criterion.key] || CheckSquare;

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        criterion.passed
          ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-800'
          : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-800'
      }`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              criterion.passed ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-400'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{criterion.label}</span>
        </div>
        {criterion.passed ? (
          <span className="inline-flex items-center text-xs font-semibold text-emerald-700 space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Passed</span>
          </span>
        ) : (
          <span className="inline-flex items-center text-xs font-semibold text-rose-700 space-x-1">
            <XCircle className="w-4 h-4" />
            <span>Failed</span>
          </span>
        )}
      </div>

      {/* Values */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-0.5">Student</p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">{criterion.studentValue}</p>
        </div>
        <div>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 mb-0.5">Required</p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">{criterion.requirement}</p>
        </div>
      </div>

      {/* Fail reason */}
      {!criterion.passed && criterion.failReason && (
        <p className="mt-2.5 text-[11px] text-rose-700 bg-rose-100/60 rounded-lg px-2.5 py-1.5 leading-relaxed">
          {criterion.failReason}
        </p>
      )}
    </div>
  );
};

// ── Main Eligibility Checker ────────────────────────────────────────────────
export const EligibilityChecker = ({ students, drives }) => {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedDriveId, setSelectedDriveId] = useState('');

  // Look up the actual objects from the live state
  const selectedStudent = useMemo(
    () => students.find((s) => s.id === selectedStudentId) || null,
    [students, selectedStudentId]
  );

  const selectedDrive = useMemo(
    () => drives.find((d) => d.id === selectedDriveId) || null,
    [drives, selectedDriveId]
  );

  // Run the pure eligibility function whenever either selection changes
  const result = useMemo(() => {
    if (!selectedStudent || !selectedDrive) return null;
    return checkEligibility(selectedStudent, selectedDrive);
  }, [selectedStudent, selectedDrive]);

  // Handle a deleted student/drive gracefully
  const studentMissing = selectedStudentId && !selectedStudent;
  const driveMissing   = selectedDriveId   && !selectedDrive;

  const bothSelected = selectedStudent && selectedDrive;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Eligibility Checker</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">
          Instantly check whether a student meets the eligibility requirements for a placement drive.
        </p>
      </div>

      {/* Demo notice */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start space-x-3 text-amber-900 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Demo Environment: </span>
          Uses live data from the Students and Placement Drives sections. Changes made there are instantly reflected here.
        </div>
      </div>

      {/* Two-column selector panel */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Select Student &amp; Drive</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Student selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="inline-flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span>Student</span>
              </span>
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 bg-white dark:bg-slate-900 transition-colors"
            >
              <option value="">— Choose a student —</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNo}) · {s.branch} · CGPA {s.cgpa}
                </option>
              ))}
            </select>
            {studentMissing && (
              <p className="text-[11px] text-rose-500 mt-1">
                This student no longer exists. Please reselect.
              </p>
            )}
          </div>

          {/* Drive selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span className="inline-flex items-center space-x-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
                <span>Placement Drive</span>
              </span>
            </label>
            <select
              value={selectedDriveId}
              onChange={(e) => setSelectedDriveId(e.target.value)}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 bg-white dark:bg-slate-900 transition-colors"
            >
              <option value="">— Choose a drive —</option>
              {drives.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.companyName} — {d.role} ({d.status})
                </option>
              ))}
            </select>
            {driveMissing && (
              <p className="text-[11px] text-rose-500 mt-1">
                This drive no longer exists. Please reselect.
              </p>
            )}
          </div>
        </div>

        {/* Quick selection summary row (visible once both are picked) */}
        {bothSelected && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="font-semibold text-indigo-700">{selectedDrive.role}</span>
            <span className="text-slate-400 dark:text-slate-500">@</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedDrive.companyName}</span>
          </div>
        )}
      </div>

      {/* ── Empty state ── */}
      {!bothSelected && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-xs">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100">
            <CheckSquare className="w-7 h-7" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
            {!selectedStudentId && !selectedDriveId
              ? 'Select a student and placement drive'
              : !selectedStudentId
              ? 'Now select a student'
              : 'Now select a placement drive'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
            Choose both a student and a placement drive above to instantly see a detailed eligibility breakdown.
          </p>
        </div>
      )}

      {/* ── Eligibility result ── */}
      {result && (
        <div className="space-y-4">
          {/* Overall verdict banner */}
          <div
            className={`rounded-2xl border p-6 text-center shadow-xs ${
              result.eligible
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 border ${
                result.eligible
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
                  : 'bg-rose-100 dark:bg-rose-900/50 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400'
              }`}
            >
              {result.eligible ? (
                <CheckCircle2 className="w-7 h-7" />
              ) : (
                <XCircle className="w-7 h-7" />
              )}
            </div>

            <h2
              className={`text-2xl font-bold mb-1 ${
                result.eligible ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
              }`}
            >
              {result.eligible ? '✓ Eligible' : '✗ Not Eligible'}
            </h2>

            <p className={`text-sm font-medium ${result.eligible ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              {selectedStudent.name} is{' '}
              {result.eligible ? '' : 'not '}
              eligible for{' '}
              <strong>{selectedDrive.role}</strong> at{' '}
              <strong>{selectedDrive.companyName}</strong>
            </p>

            {/* Pass / fail counts */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <span className="inline-flex items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{result.criteria.filter((c) => c.passed).length} passed</span>
              </span>
              {result.criteria.some((c) => !c.passed) && (
                <span className="inline-flex items-center text-xs font-semibold text-rose-700 dark:text-rose-400 space-x-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{result.criteria.filter((c) => !c.passed).length} failed</span>
                </span>
              )}
            </div>
          </div>

          {/* Criterion breakdown */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Eligibility Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.criteria.map((criterion) => (
                <CriterionCard key={criterion.key} criterion={criterion} />
              ))}
            </div>
          </div>

          {/* Drive summary info panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Drive Requirements Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Min CGPA</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">≥ {selectedDrive.minCGPA}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Max Backlogs</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">≤ {selectedDrive.maxBacklogs}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Eligible Depts</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                  {Array.isArray(selectedDrive.eligibleBranches) && selectedDrive.eligibleBranches.length > 0
                    ? selectedDrive.eligibleBranches.join(', ')
                    : 'All'}
                </p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Package (CTC)</p>
                <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">₹{selectedDrive.packageLPA} LPA</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 border-t border-slate-100 dark:border-slate-800 pt-3">
              Eligibility is calculated using the requirements configured for this placement drive.
              Update the drive record to change these criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EligibilityChecker;
