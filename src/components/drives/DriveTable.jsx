import React from 'react';
import { Edit2, Trash2, CalendarDays, MapPin, IndianRupee, Users } from 'lucide-react';
import { Badge } from '../common/Badge';
import { getDriveStatusVariant } from './DriveCard';

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

export const DriveTable = ({ drives, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Company / Role
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Drive Date
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 hidden md:table-cell">
                Location
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                CTC (LPA)
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">
                Eligibility
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Registered
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {drives.map((drive) => (
              <tr key={drive.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Company / Role */}
                <td className="px-4 py-3">
                  <div className="text-sm font-semibold text-slate-900 leading-snug">
                    {drive.role}
                  </div>
                  <div className="text-xs text-indigo-600 font-medium mt-0.5">
                    {drive.companyName}
                  </div>
                </td>

                {/* Drive Date */}
                <td className="px-4 py-3">
                  <div className="flex items-center text-xs text-slate-600">
                    <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                    {formatDate(drive.driveDate)}
                  </div>
                </td>

                {/* Location */}
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="flex items-center text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                    <span className="truncate max-w-[140px]">{drive.location || '—'}</span>
                  </div>
                </td>

                {/* CTC */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center text-sm font-bold text-slate-900">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {drive.packageLPA}
                    <span className="text-xs text-slate-400 font-normal ml-1">LPA</span>
                  </div>
                </td>

                {/* Eligibility */}
                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1 mb-1">
                    {(drive.eligibleBranches || []).map((b) => (
                      <span key={b} className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-1.5 py-0.5 rounded">
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    CGPA ≥ {drive.minCGPA} · Backlogs ≤ {drive.maxBacklogs}
                  </div>
                </td>

                {/* Registered count */}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center text-xs font-semibold text-slate-700">
                    <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {drive.registeredCount ?? 0}
                  </div>
                  {drive.status === 'Completed' && (
                    <div className="text-[10px] text-emerald-600 mt-0.5">
                      {drive.selectedCount ?? 0} selected
                    </div>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <Badge variant={getDriveStatusVariant(drive.status)} size="xs">
                    {drive.status}
                  </Badge>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end space-x-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(drive)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      title="Edit drive"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(drive)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete drive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriveTable;
