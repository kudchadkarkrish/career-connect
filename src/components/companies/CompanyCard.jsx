import React from 'react';
import {
  Building2,
  MapPin,
  ExternalLink,
  Mail,
  Edit2,
  Trash2,
  IndianRupee,
  Briefcase
} from 'lucide-react';
import { Badge, getTierVariant } from '../common/Badge';

export const CompanyCard = ({ company, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        {/* Header: Company Name & Tier */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {company.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{company.industry}</p>
          </div>
          <Badge variant={getTierVariant(company.tier)}>{company.tier}</Badge>
        </div>

        {/* Package & Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2.5 py-1.5 rounded-lg">
            <IndianRupee className="w-3.5 h-3.5 mr-1.5 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              ₹{company.basePackageLPA} - {company.maxPackageLPA} LPA
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">(CTC Range)</span>
          </div>

          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="truncate">{company.location || 'Multiple Locations'}</span>
          </div>
        </div>

        {/* Roles Offered */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1.5">
            Roles Offered
          </span>
          <div className="flex flex-wrap gap-1.5">
            {Array.isArray(company.rolesOffered) && company.rolesOffered.length > 0 ? (
              company.rolesOffered.map((role, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[11px] bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium px-2 py-0.5 rounded"
                >
                  <Briefcase className="w-2.5 h-2.5 mr-1 text-slate-400 dark:text-slate-500" />
                  {role}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">No roles specified</span>
            )}
          </div>
        </div>

        {/* Links & Status */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-3">
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                title="Visit website"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1" />
                <span>Careers</span>
              </a>
            )}
            {company.contactEmail && (
              <span className="inline-flex items-center text-slate-400 dark:text-slate-500" title={company.contactEmail}>
                <Mail className="w-3.5 h-3.5 mr-1" />
                <span className="truncate max-w-[110px]">{company.contactEmail}</span>
              </span>
            )}
          </div>
          <span
            className={`inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full ${
              company.status === 'Active Partner'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                company.status === 'Active Partner' ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
            {company.status || 'Active Partner'}
          </span>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="bg-slate-50/70 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 px-5 py-2.5 flex items-center justify-end space-x-2">
        <button
          type="button"
          onClick={() => onEdit(company)}
          className="inline-flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Edit2 className="w-3 h-3 mr-1" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(company)}
          className="inline-flex items-center text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
