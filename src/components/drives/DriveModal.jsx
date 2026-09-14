import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { AVAILABLE_DEPARTMENTS, DRIVE_STATUSES } from '../../data/mockData';

const DEFAULT_FORM = {
  companyId: '',
  companyName: '',
  role: '',
  driveDate: '',
  deadline: '',
  location: '',
  packageLPA: '',
  minCGPA: '',
  maxBacklogs: '0',
  eligibleBranches: [],
  status: 'Upcoming',
  registeredCount: '0',
  selectedCount: '0',
  description: '',
};

// Sentinel value used when user wants a custom (non-directory) company name
const CUSTOM_SENTINEL = '__custom__';

export const DriveModal = ({ isOpen, onClose, onSave, driveToEdit, companies }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [customCompanyName, setCustomCompanyName] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (driveToEdit) {
      // Detect whether the drive's company exists in the directory.
      // If the companyId is missing or not found, treat it as a custom company.
      const isKnownCompany =
        driveToEdit.companyId &&
        companies.some((c) => c.id === driveToEdit.companyId);

      setFormData({
        companyId: isKnownCompany ? driveToEdit.companyId : CUSTOM_SENTINEL,
        companyName: isKnownCompany ? driveToEdit.companyName || '' : '',
        role: driveToEdit.role || '',
        driveDate: driveToEdit.driveDate || '',
        deadline: driveToEdit.deadline || '',
        location: driveToEdit.location || '',
        packageLPA: driveToEdit.packageLPA !== undefined ? String(driveToEdit.packageLPA) : '',
        minCGPA: driveToEdit.minCGPA !== undefined ? String(driveToEdit.minCGPA) : '',
        maxBacklogs: driveToEdit.maxBacklogs !== undefined ? String(driveToEdit.maxBacklogs) : '0',
        eligibleBranches: Array.isArray(driveToEdit.eligibleBranches) ? [...driveToEdit.eligibleBranches] : [],
        status: driveToEdit.status || 'Upcoming',
        registeredCount: driveToEdit.registeredCount !== undefined ? String(driveToEdit.registeredCount) : '0',
        selectedCount: driveToEdit.selectedCount !== undefined ? String(driveToEdit.selectedCount) : '0',
        description: driveToEdit.description || '',
      });
      // Restore the custom name when re-opening a custom-company drive
      setCustomCompanyName(isKnownCompany ? '' : driveToEdit.companyName || '');
    } else {
      setFormData(DEFAULT_FORM);
      setCustomCompanyName('');
    }
    setErrors({});
  }, [driveToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Handles the company dropdown, including the custom sentinel
  const handleCompanySelect = (e) => {
    const selectedId = e.target.value;
    if (selectedId === CUSTOM_SENTINEL) {
      setFormData((prev) => ({ ...prev, companyId: CUSTOM_SENTINEL, companyName: '' }));
      setCustomCompanyName('');
    } else {
      const company = companies.find((c) => c.id === selectedId);
      setFormData((prev) => ({
        ...prev,
        companyId: selectedId,
        companyName: company ? company.name : '',
      }));
      setCustomCompanyName('');
    }
    if (errors.companyId) setErrors((prev) => ({ ...prev, companyId: null }));
    if (errors.customCompanyName) setErrors((prev) => ({ ...prev, customCompanyName: null }));
  };

  const handleBranchToggle = (branch) => {
    setFormData((prev) => {
      const already = prev.eligibleBranches.includes(branch);
      return {
        ...prev,
        eligibleBranches: already
          ? prev.eligibleBranches.filter((b) => b !== branch)
          : [...prev.eligibleBranches, branch],
      };
    });
  };

  const isCustomMode = formData.companyId === CUSTOM_SENTINEL;

  const validate = () => {
    const newErrors = {};
    if (isCustomMode) {
      if (!customCompanyName.trim()) newErrors.customCompanyName = 'Company name is required';
    } else {
      if (!formData.companyId) newErrors.companyId = 'Select a company';
    }
    if (!formData.role.trim()) newErrors.role = 'Job role is required';
    if (!formData.driveDate) newErrors.driveDate = 'Drive date is required';
    const pkg = parseFloat(formData.packageLPA);
    if (!formData.packageLPA || isNaN(pkg) || pkg <= 0) newErrors.packageLPA = 'Enter a valid CTC';
    const cgpa = parseFloat(formData.minCGPA);
    if (!formData.minCGPA || isNaN(cgpa) || cgpa < 0 || cgpa > 10) newErrors.minCGPA = 'Enter CGPA between 0–10';
    if (formData.eligibleBranches.length === 0) newErrors.eligibleBranches = 'Select at least one department';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const resolvedCompanyId   = isCustomMode ? null : formData.companyId;
    const resolvedCompanyName = isCustomMode ? customCompanyName.trim() : formData.companyName;

    const payload = {
      companyId: resolvedCompanyId,
      companyName: resolvedCompanyName,
      role: formData.role.trim(),
      driveDate: formData.driveDate,
      deadline: formData.deadline,
      location: formData.location.trim(),
      packageLPA: parseFloat(formData.packageLPA),
      minCGPA: parseFloat(formData.minCGPA),
      maxBacklogs: parseInt(formData.maxBacklogs, 10),
      eligibleBranches: formData.eligibleBranches,
      status: formData.status,
      registeredCount: parseInt(formData.registeredCount, 10) || 0,
      selectedCount: parseInt(formData.selectedCount, 10) || 0,
      description: formData.description.trim(),
      rounds: driveToEdit?.rounds || [],
    };

    onSave(payload);
  };


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={driveToEdit ? 'Edit Placement Drive' : 'Create Placement Drive'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Company */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Company <span className="text-rose-500">*</span>
          </label>
          <select
            name="companyId"
            value={formData.companyId}
            onChange={handleCompanySelect}
            className={`w-full text-sm rounded-lg border px-3 py-2 outline-none bg-white dark:bg-slate-900 transition-colors ${
              errors.companyId
                ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
            }`}
          >
            <option value="">— Select a company —</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
            <option value={CUSTOM_SENTINEL}>➕ Add New Company</option>
          </select>
          {errors.companyId && <p className="text-[11px] text-rose-500 mt-1">{errors.companyId}</p>}

          {/* Custom company name input — shown only when sentinel is selected */}
          {isCustomMode && (
            <div className="mt-2">
              <input
                type="text"
                value={customCompanyName}
                onChange={(e) => {
                  setCustomCompanyName(e.target.value);
                  if (errors.customCompanyName) setErrors((prev) => ({ ...prev, customCompanyName: null }));
                }}
                placeholder="Enter company name (e.g. Startup XYZ)"
                className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors ${
                  errors.customCompanyName
                    ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
                }`}
              />
              {errors.customCompanyName && (
                <p className="text-[11px] text-rose-500 mt-1">{errors.customCompanyName}</p>
              )}
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                This company will be stored with the drive only — it won't be added to the Companies directory.
              </p>
            </div>
          )}
        </div>

        {/* Row 2: Role */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Job Role <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g. Software Engineer"
            className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors ${
              errors.role
                ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
            }`}
          />
          {errors.role && <p className="text-[11px] text-rose-500 mt-1">{errors.role}</p>}
        </div>

        {/* Row 3: Drive Date, Deadline, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Drive Date <span className="text-rose-500">*</span>
            </label>
            <input
              type="date"
              name="driveDate"
              value={formData.driveDate}
              onChange={handleChange}
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors ${
                errors.driveDate
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
              }`}
            />
            {errors.driveDate && <p className="text-[11px] text-rose-500 mt-1">{errors.driveDate}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Registration Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 bg-white dark:bg-slate-900"
            >
              {DRIVE_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 4: Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Campus Auditorium / Virtual"
            className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
          />
        </div>

        {/* Row 5: CTC, Min CGPA, Max Backlogs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Package / CTC (LPA) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              name="packageLPA"
              value={formData.packageLPA}
              onChange={handleChange}
              placeholder="e.g. 16.5"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors ${
                errors.packageLPA
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
              }`}
            />
            {errors.packageLPA && <p className="text-[11px] text-rose-500 mt-1">{errors.packageLPA}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Min CGPA <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="minCGPA"
              value={formData.minCGPA}
              onChange={handleChange}
              placeholder="e.g. 7.5"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors ${
                errors.minCGPA
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200'
              }`}
            />
            {errors.minCGPA && <p className="text-[11px] text-rose-500 mt-1">{errors.minCGPA}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Max Backlogs Allowed
            </label>
            <input
              type="number"
              step="1"
              min="0"
              name="maxBacklogs"
              value={formData.maxBacklogs}
              onChange={handleChange}
              placeholder="0"
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Row 6: Eligible Branches */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Eligible Departments <span className="text-rose-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_DEPARTMENTS.map((dept) => {
              const selected = formData.eligibleBranches.includes(dept);
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => handleBranchToggle(dept)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    selected
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 dark:text-slate-500 border-slate-300 hover:border-indigo-400 hover:text-indigo-600'
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
          {errors.eligibleBranches && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.eligibleBranches}</p>
          )}
        </div>

        {/* Row 7: Registered & Selected (for edit / completed drives) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Registered Students
            </label>
            <input
              type="number"
              min="0"
              name="registeredCount"
              value={formData.registeredCount}
              onChange={handleChange}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Selected Students
            </label>
            <input
              type="number"
              min="0"
              name="selectedCount"
              value={formData.selectedCount}
              onChange={handleChange}
              className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
            />
          </div>
        </div>

        {/* Row 8: Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Drive Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            placeholder="Brief description of the drive..."
            className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 resize-none"
          />
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 dark:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
          >
            {driveToEdit ? 'Save Changes' : 'Create Drive'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DriveModal;
