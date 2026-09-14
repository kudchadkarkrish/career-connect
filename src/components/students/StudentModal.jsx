import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { AVAILABLE_DEPARTMENTS } from '../../data/mockData';

const DEFAULT_FORM = {
  name: '',
  rollNo: '',
  email: '',
  branch: 'CSE',
  cgpa: '',
  backlogs: '0',
  skillsString: '',
  status: 'Unplaced',
};

const STATUS_OPTIONS = ['Unplaced', 'Placed', 'Opted Out'];

export const StudentModal = ({ isOpen, onClose, onSave, studentToEdit }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name || '',
        rollNo: studentToEdit.rollNo || '',
        email: studentToEdit.email || '',
        branch: studentToEdit.branch || 'CSE',
        cgpa: studentToEdit.cgpa !== undefined ? String(studentToEdit.cgpa) : '',
        backlogs: studentToEdit.backlogs !== undefined ? String(studentToEdit.backlogs) : '0',
        skillsString: Array.isArray(studentToEdit.skills) ? studentToEdit.skills.join(', ') : '',
        status: studentToEdit.status || 'Unplaced',
      });
    } else {
      setFormData(DEFAULT_FORM);
    }
    setErrors({});
  }, [studentToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll / Registration number is required';
    const cgpaNum = parseFloat(formData.cgpa);
    if (!formData.cgpa || isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      newErrors.cgpa = 'Enter a valid CGPA between 0 and 10';
    }
    const backlogsNum = parseInt(formData.backlogs, 10);
    if (isNaN(backlogsNum) || backlogsNum < 0) {
      newErrors.backlogs = 'Enter a valid backlog count (0 or more)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const skills = formData.skillsString
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      name: formData.name.trim(),
      rollNo: formData.rollNo.trim(),
      email: formData.email.trim(),
      branch: formData.branch,
      cgpa: parseFloat(parseFloat(formData.cgpa).toFixed(2)),
      backlogs: parseInt(formData.backlogs, 10),
      skills: skills.length > 0 ? skills : [],
      status: formData.status,
      // Preserve existing placement details on edit; clear if status changed away from Placed
      placedDetails:
        formData.status === 'Placed' && studentToEdit?.placedDetails
          ? studentToEdit.placedDetails
          : null,
    };

    onSave(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={studentToEdit ? 'Edit Student Record' : 'Add Student'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name & Roll No */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Aarav Sharma"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors dark:bg-slate-800 dark:text-slate-100 ${
                errors.name
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200 dark:border-rose-500/50 dark:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 dark:border-slate-700 dark:focus:ring-indigo-900/50'
              }`}
            />
            {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Roll / Registration No. <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="e.g. 2022CSB001"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors font-mono dark:bg-slate-800 dark:text-slate-100 ${
                errors.rollNo
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200 dark:border-rose-500/50 dark:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 dark:border-slate-700 dark:focus:ring-indigo-900/50'
              }`}
            />
            {errors.rollNo && <p className="text-[11px] text-rose-500 mt-1">{errors.rollNo}</p>}
          </div>
        </div>

        {/* Row 2: Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            College Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. student@college.edu"
            className="w-full text-sm rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 transition-colors dark:bg-slate-800 dark:text-slate-100"
          />
        </div>

        {/* Row 3: Branch, CGPA, Backlogs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full text-sm rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 bg-white dark:bg-slate-800 dark:text-slate-100"
            >
              {AVAILABLE_DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              CGPA <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              placeholder="e.g. 8.45"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors dark:bg-slate-800 dark:text-slate-100 ${
                errors.cgpa
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200 dark:border-rose-500/50 dark:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 dark:border-slate-700 dark:focus:ring-indigo-900/50'
              }`}
            />
            {errors.cgpa && <p className="text-[11px] text-rose-500 mt-1">{errors.cgpa}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Active Backlogs <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              step="1"
              min="0"
              name="backlogs"
              value={formData.backlogs}
              onChange={handleChange}
              placeholder="0"
              className={`w-full text-sm rounded-lg border px-3 py-2 outline-none transition-colors dark:bg-slate-800 dark:text-slate-100 ${
                errors.backlogs
                  ? 'border-rose-300 focus:border-rose-500 ring-1 ring-rose-200 dark:border-rose-500/50 dark:ring-rose-500/20'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 dark:border-slate-700 dark:focus:ring-indigo-900/50'
              }`}
            />
            {errors.backlogs && <p className="text-[11px] text-rose-500 mt-1">{errors.backlogs}</p>}
          </div>
        </div>

        {/* Row 4: Skills */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Skills (Comma Separated)
          </label>
          <input
            type="text"
            name="skillsString"
            value={formData.skillsString}
            onChange={handleChange}
            placeholder="e.g. React, Python, System Design, Docker"
            className="w-full text-sm rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 dark:bg-slate-800 dark:text-slate-100"
          />
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Separate multiple skills with a comma</p>
        </div>

        {/* Row 5: Placement Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Placement Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full text-sm rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 dark:focus:ring-indigo-900/50 bg-white dark:bg-slate-800 dark:text-slate-100"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {formData.status === 'Placed' && studentToEdit?.placedDetails && (
            <p className="text-[11px] text-emerald-700 dark:text-emerald-500 mt-1">
              ✓ Placement details from drive record will be retained.
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm shadow-indigo-200 dark:shadow-none transition-colors cursor-pointer"
          >
            {studentToEdit ? 'Save Changes' : 'Add Student'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StudentModal;
