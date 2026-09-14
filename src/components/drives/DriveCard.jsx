import React from 'react';
import {
  Building2,
  CalendarDays,
  MapPin,
  IndianRupee,
  Users,
  GraduationCap,
  BookOpen,
  Edit2,
  Trash2
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const getDriveStatusVariant = (status) => {
  if (status === 'Upcoming')  return 'indigo';
  if (status === 'Ongoing')   return 'amber';
  if (status === 'Completed') return 'emerald';
  if (status === 'Cancelled') return 'rose';
  return 'slate';
};

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export const DriveCard = ({ drive, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Header: Company & Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 mb-0.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 truncate">
                {drive.companyName}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
              {drive.role}
            </h3>
          </div>
          <Badge variant={getDriveStatusVariant(drive.status)} size="xs">
            {drive.status}
          </Badge>
        </div>

        {/* Package */}
        <div className="flex items-center text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 px-2.5 py-1.5 rounded-lg mb-3">
          <IndianRupee className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-500 shrink-0" />
          <span className="font-semibold text-slate-900 dark:text-slate-100">₹{drive.packageLPA} LPA</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">(CTC)</span>
        </div>

        {/* Date & Location */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>{formatDate(drive.driveDate)}</span>
          </div>
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="truncate">{drive.location || '—'}</span>
          </div>
        </div>

        {/* Eligibility */}
        <div className="mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
            Eligibility
          </span>
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {Array.isArray(drive.eligibleBranches) && drive.eligibleBranches.map((b) => (
              <span key={b} className="text-[11px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium px-2 py-0.5 rounded border border-transparent dark:border-indigo-800/60">
                {b}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              Min CGPA: <strong className="dark:text-slate-200">{drive.minCGPA}</strong>
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              Backlogs ≤ <strong className="dark:text-slate-200">{drive.maxBacklogs}</strong>
            </span>
          </div>
        </div>

        {/* Registered count */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span><strong className="text-slate-700 dark:text-slate-300">{drive.registeredCount ?? 0}</strong> registered</span>
          </span>
          {drive.status === 'Completed' && (
            <span className="text-emerald-700 dark:text-emerald-500 font-semibold">
              {drive.selectedCount ?? 0} selected
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50/70 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 px-5 py-2.5 flex items-center justify-end space-x-2">
        <button
          type="button"
          onClick={() => onEdit(drive)}
          className="inline-flex items-center text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Edit2 className="w-3 h-3 mr-1" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(drive)}
          className="inline-flex items-center text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DriveCard;
