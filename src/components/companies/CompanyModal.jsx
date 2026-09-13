import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

const DEFAULT_COMPANY_FORM = {
  name: '',
  industry: '',
  tier: 'Tier-1',
  location: '',
  website: '',
  contactEmail: '',
  rolesString: '',
  basePackageLPA: '',
  maxPackageLPA: '',
  status: 'Active Partner'
};

const TIER_OPTIONS = [
  'Tier-1 Dream',
  'Tier-1 Core',
  'Tier-1',
  'Tier-2',
  'Tier-2 Core',
  'Mass Recruiter'
];

export const CompanyModal = ({ isOpen, onClose, onSave, companyToEdit }) => {
  const [formData, setFormData] = useState(DEFAULT_COMPANY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (companyToEdit) {
      setFormData({
        name: companyToEdit.name || '',
        industry: companyToEdit.industry || '',
        tier: companyToEdit.tier || 'Tier-1',
        location: companyToEdit.location || '',
        website: companyToEdit.website || '',
        contactEmail: companyToEdit.contactEmail || '',
        rolesString: Array.isArray(companyToEdit.rolesOffered)
          ? companyToEdit.rolesOffered.join(', ')
          : '',
        basePackageLPA: companyToEdit.basePackageLPA !== undefined ? companyToEdit.basePackageLPA : '',
        maxPackageLPA: companyToEdit.maxPackageLPA !== undefined ? companyToEdit.maxPackageLPA : '',
        status: companyToEdit.status || 'Active Partner'
      });
    } else {
      setFormData(DEFAULT_COMPANY_FORM);
    }
    setErrors({});
  }, [companyToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Company name is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry/Domain is required';
    if (!formData.basePackageLPA || Number(formData.basePackageLPA) <= 0) {
      newErrors.basePackageLPA = 'Enter a valid base package';
    }
    if (!formData.maxPackageLPA || Number(formData.maxPackageLPA) <= 0) {
      newErrors.maxPackageLPA = 'Enter a valid max package';
    }
    if (
      formData.basePackageLPA &&
      formData.maxPackageLPA &&
      Number(formData.maxPackageLPA) < Number(formData.basePackageLPA)
    ) {
      newErrors.maxPackageLPA = 'Max package cannot be less than base package';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const rolesOffered = formData.rolesString
      .split(',')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const payload = {
      name: formData.name.trim(),
      industry: formData.industry.trim(),
      tier: formData.tier,
      location: formData.location.trim(),
      website: formData.website.trim(),
      contactEmail: formData.contactEmail.trim(),
      rolesOffered: rolesOffered.length > 0 ? rolesOffered : ['Software Trainee'],
      basePackageLPA: parseFloat(formData.basePackageLPA),
      maxPackageLPA: parseFloat(formData.maxPackageLPA),
      status: formData.status
    };

    onSave(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={companyToEdit ? 'Edit Company Details' : 'Add Recruiting Company'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name & Industry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Cisco Systems"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-hidden transition-colors ${
                errors.name
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
              }`}
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Industry / Sector <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g. Enterprise Cloud / FinTech"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-hidden transition-colors ${
                errors.industry
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
              }`}
            />
            {errors.industry && <p className="text-[11px] text-rose-500 mt-1">{errors.industry}</p>}
          </div>
        </div>

        {/* Row 2: Tier & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company Tier</label>
            <select
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 bg-white"
            >
              {TIER_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Partnership Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 bg-white"
            >
              <option value="Active Partner">Active Partner</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Row 3: CTC Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Base CTC (LPA) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              name="basePackageLPA"
              value={formData.basePackageLPA}
              onChange={handleChange}
              placeholder="e.g. 12.0"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-hidden transition-colors ${
                errors.basePackageLPA
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
              }`}
            />
            {errors.basePackageLPA && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.basePackageLPA}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Max CTC (LPA) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              name="maxPackageLPA"
              value={formData.maxPackageLPA}
              onChange={handleChange}
              placeholder="e.g. 18.5"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-hidden transition-colors ${
                errors.maxPackageLPA
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
              }`}
            />
            {errors.maxPackageLPA && (
              <p className="text-[11px] text-rose-500 mt-1">{errors.maxPackageLPA}</p>
            )}
          </div>
        </div>

        {/* Row 4: Roles Offered */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Roles Offered (Comma Separated)
          </label>
          <input
            type="text"
            name="rolesString"
            value={formData.rolesString}
            onChange={handleChange}
            placeholder="e.g. Software Engineer, QA Engineer, Cloud Associate"
            className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
          />
          <p className="text-[11px] text-slate-400 mt-1">Separate multiple job profiles with a comma</p>
        </div>

        {/* Row 5: Location, Website, Email */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Location(s)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Bengaluru / Pune"
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Careers Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Recruiter Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="campus@company.com"
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
          >
            {companyToEdit ? 'Save Changes' : 'Add Company'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CompanyModal;
