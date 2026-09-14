import React from 'react';
import {
  GraduationCap,
  Hash,
  Edit2,
  Trash2,
  BookOpen,
  IndianRupee,
  Building2
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const getStatusVariant = (status) => {
  if (status === 'Placed') return 'emerald';
  if (status === 'Unplaced') return 'rose';
  if (status === 'Opted Out') return 'slate';
  return 'slate';
};

const BRANCH_COLORS = {
  CSE: 'bg-indigo-50 text-indigo-700',
  IT:  'bg-blue-50 text-blue-700',
  ECE: 'bg-purple-50 text-purple-700',
  ME:  'bg-amber-50 text-amber-700',
  CE:  'bg-emerald-50 text-emerald-700',
};

export const StudentCard = ({ student, onEdit, onDelete }) => {
  const branchColor = BRANCH_COLORS[student.branch] || 'bg-slate-100 text-slate-700';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Header: Name & Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
              {student.name}
            </h3>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded ${branchColor}`}>
                {student.branch}
              </span>
              <span className="flex items-center text-xs text-slate-500">
                <Hash className="w-3 h-3 mr-0.5 text-slate-400" />
                {student.rollNo}
              </span>
            </div>
          </div>
          <Badge variant={getStatusVariant(student.status)} size="xs">
            {student.status}
          </Badge>
        </div>

        {/* CGPA & Backlogs */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-xs text-slate-700 bg-slate-50 border border-slate-100 px-2.5 py-1.5 rounded-lg flex-1">
            <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-indigo-500 shrink-0" />
            <span className="font-semibold text-slate-900">CGPA {student.cgpa.toFixed(2)}</span>
          </div>
          <div className={`flex items-center text-xs px-2.5 py-1.5 rounded-lg border flex-1 ${
            student.backlogs > 0
              ? 'bg-rose-50 border-rose-100 text-rose-700'
              : 'bg-emerald-50 border-emerald-100 text-emerald-700'
          }`}>
            <BookOpen className="w-3.5 h-3.5 mr-1.5 shrink-0" />
            <span className="font-semibold">
              {student.backlogs === 0 ? 'No Backlogs' : `${student.backlogs} Backlog${student.backlogs > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
            Skills
          </span>
          <div className="flex flex-wrap gap-1.5">
            {Array.isArray(student.skills) && student.skills.length > 0 ? (
              student.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No skills listed</span>
            )}
            {student.skills && student.skills.length > 4 && (
              <span className="inline-flex items-center text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                +{student.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Placement detail (if placed) */}
        {student.status === 'Placed' && student.placedDetails && (
          <div className="pt-2.5 border-t border-slate-100">
            <div className="flex items-start text-xs text-slate-600 space-x-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-semibold text-slate-900">{student.placedDetails.companyName}</span>
                <span className="text-slate-400 mx-1">·</span>
                <span className="inline-flex items-center text-emerald-700 font-semibold">
                  <IndianRupee className="w-3 h-3 mr-0.5" />
                  {student.placedDetails.packageLPA} LPA
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="bg-slate-50/70 border-t border-slate-100 px-5 py-2.5 flex items-center justify-end space-x-2">
        <button
          type="button"
          onClick={() => onEdit(student)}
          className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-indigo-600 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Edit2 className="w-3 h-3 mr-1" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(student)}
          className="inline-flex items-center text-xs font-medium text-rose-600 hover:text-rose-700 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
