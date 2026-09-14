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
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Header: Company & Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5 mb-0.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="text-xs font-semibold text-indigo-700 truncate">
                {drive.companyName}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
              {drive.role}
            </h3>
          </div>
          <Badge variant={getDriveStatusVariant(drive.status)} size="xs">
            {drive.status}
          </Badge>
        </div>

        {/* Package */}
        <div className="flex items-center text-xs text-slate-700 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg mb-3">
          <IndianRupee className="w-3.5 h-3.5 mr-1.5 text-emerald-600 shrink-0" />
          <span className="font-semibold text-slate-900">₹{drive.packageLPA} LPA</span>
          <span className="text-[10px] text-slate-400 ml-1">(CTC)</span>
        </div>

        {/* Date & Location */}
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center text-xs text-slate-500">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
            <span>{formatDate(drive.driveDate)}</span>
          </div>
          <div className="flex items-center text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
            <span className="truncate">{drive.location || '—'}</span>
          </div>
        </div>

        {/* Eligibility */}
        <div className="mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
            Eligibility
          </span>
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {Array.isArray(drive.eligibleBranches) && drive.eligibleBranches.map((b) => (
              <span key={b} className="text-[11px] bg-indigo-50 text-indigo-700 font-medium px-2 py-0.5 rounded">
                {b}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-600">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-slate-400" />
              Min CGPA: <strong>{drive.minCGPA}</strong>
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-slate-400" />
              Backlogs ≤ <strong>{drive.maxBacklogs}</strong>
            </span>
          </div>
        </div>

        {/* Registered count */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span><strong className="text-slate-700">{drive.registeredCount ?? 0}</strong> registered</span>
          </span>
          {drive.status === 'Completed' && (
            <span className="text-emerald-700 font-semibold">
              {drive.selectedCount ?? 0} selected
            </span>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-slate-50/70 border-t border-slate-100 px-5 py-2.5 flex items-center justify-end space-x-2">
        <button
          type="button"
          onClick={() => onEdit(drive)}
          className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Edit2 className="w-3 h-3 mr-1" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(drive)}
          className="inline-flex items-center text-xs font-medium text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DriveCard;
