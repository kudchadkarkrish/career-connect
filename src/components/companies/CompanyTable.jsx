import React from 'react';
import { Edit2, Trash2, ExternalLink, MapPin } from 'lucide-react';
import { Badge, getTierVariant } from '../common/Badge';

export const CompanyTable = ({ companies, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3.5">
                Company & Tier
              </th>
              <th scope="col" className="px-5 py-3.5">
                Industry
              </th>
              <th scope="col" className="px-5 py-3.5">
                Roles Offered
              </th>
              <th scope="col" className="px-5 py-3.5 whitespace-nowrap">
                CTC Range (LPA)
              </th>
              <th scope="col" className="px-5 py-3.5">
                Location
              </th>
              <th scope="col" className="px-5 py-3.5">
                Status
              </th>
              <th scope="col" className="px-5 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {companies.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                {/* Company Name & Tier */}
                <td className="px-5 py-4">
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900">{c.name}</span>
                      {c.website && (
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-indigo-600"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <div className="mt-1">
                      <Badge variant={getTierVariant(c.tier)} size="xs">
                        {c.tier}
                      </Badge>
                    </div>
                  </div>
                </td>

                {/* Industry */}
                <td className="px-5 py-4 text-xs font-medium text-slate-600">
                  {c.industry}
                </td>

                {/* Roles Offered */}
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {Array.isArray(c.rolesOffered) && c.rolesOffered.length > 0 ? (
                      c.rolesOffered.map((role, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded"
                        >
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">None</span>
                    )}
                  </div>
                </td>

                {/* CTC Range */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className="font-semibold text-slate-900">
                    ₹{c.basePackageLPA} - {c.maxPackageLPA}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">LPA</span>
                </td>

                {/* Location */}
                <td className="px-5 py-4 text-xs text-slate-500">
                  <div className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                    <span className="truncate max-w-[150px]">{c.location || 'N/A'}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      c.status === 'Active Partner'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        c.status === 'Active Partner' ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                    />
                    {c.status || 'Active Partner'}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end space-x-1.5">
                    <button
                      type="button"
                      onClick={() => onEdit(c)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      title="Edit company"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(c)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete company"
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

export default CompanyTable;
