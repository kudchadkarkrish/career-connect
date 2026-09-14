import React from 'react';
import { Edit2, Trash2, IndianRupee } from 'lucide-react';
import { Badge } from '../common/Badge';
import { getStatusVariant } from './StudentCard';

const BRANCH_COLORS = {
  CSE: 'bg-indigo-50 text-indigo-700',
  IT:  'bg-blue-50 text-blue-700',
  ECE: 'bg-purple-50 text-purple-700',
  ME:  'bg-amber-50 text-amber-700',
  CE:  'bg-emerald-50 text-emerald-700',
};

export const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Student
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Roll No.
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Dept
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                CGPA
              </th>
              <th className="px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Backlogs
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 hidden lg:table-cell">
                Skills
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Status / Placed At
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {students.map((student) => {
              const branchColor = BRANCH_COLORS[student.branch] || 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
              return (
                <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                  {/* Name */}
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{student.name}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[140px]">{student.email}</div>
                  </td>

                  {/* Roll No */}
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400">{student.rollNo}</span>
                  </td>

                  {/* Branch */}
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded ${branchColor}`}>
                      {student.branch}
                    </span>
                  </td>

                  {/* CGPA */}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold ${
                      student.cgpa >= 8.5 ? 'text-emerald-700 dark:text-emerald-500' :
                      student.cgpa >= 7.0 ? 'text-slate-800 dark:text-slate-300' :
                      'text-amber-700 dark:text-amber-500'
                    }`}>
                      {student.cgpa.toFixed(2)}
                    </span>
                  </td>

                  {/* Backlogs */}
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-semibold ${
                      student.backlogs === 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {student.backlogs}
                    </span>
                  </td>

                  {/* Skills */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(student.skills || []).slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-medium">
                          {skill}
                        </span>
                      ))}
                      {student.skills && student.skills.length > 3 && (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 px-1">+{student.skills.length - 3}</span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <Badge variant={getStatusVariant(student.status)} size="xs">
                      {student.status}
                    </Badge>
                    {student.status === 'Placed' && student.placedDetails && (
                      <div className="flex items-center text-[11px] text-emerald-700 font-medium mt-1">
                        <IndianRupee className="w-3 h-3 mr-0.5" />
                        {student.placedDetails.packageLPA} LPA · {student.placedDetails.companyName}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit(student)}
                        className="inline-flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(student)}
                        className="inline-flex items-center text-xs font-medium text-rose-600 hover:text-rose-700 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-900/30 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
