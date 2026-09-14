import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import DriveCard from './DriveCard';
import DriveTable from './DriveTable';
import DriveModal from './DriveModal';
import DriveDeleteModal from './DriveDeleteModal';
import { addDrive, updateDrive, deleteDrive } from '../../services/storageService';
import { DRIVE_STATUSES, AVAILABLE_DEPARTMENTS } from '../../data/mockData';

export const DriveList = ({ drives, onDrivesChange, companies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driveToEdit, setDriveToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [driveToDelete, setDriveToDelete] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // Filter logic
  const filteredDrives = useMemo(() => {
    return drives.filter((d) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (d.companyName && d.companyName.toLowerCase().includes(q)) ||
        (d.role && d.role.toLowerCase().includes(q)) ||
        (d.location && d.location.toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
      const matchesBranch =
        branchFilter === 'ALL' ||
        (Array.isArray(d.eligibleBranches) && d.eligibleBranches.includes(branchFilter));

      return matchesSearch && matchesStatus && matchesBranch;
    });
  }, [drives, searchTerm, statusFilter, branchFilter]);

  // Derived stats
  const upcomingCount  = useMemo(() => drives.filter((d) => d.status === 'Upcoming').length,  [drives]);
  const ongoingCount   = useMemo(() => drives.filter((d) => d.status === 'Ongoing').length,   [drives]);
  const completedCount = useMemo(() => drives.filter((d) => d.status === 'Completed').length, [drives]);

  // Handlers
  const handleOpenAdd = () => {
    setDriveToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (drive) => {
    setDriveToEdit(drive);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (drive) => {
    setDriveToDelete(drive);
    setIsDeleteModalOpen(true);
  };

  const handleSaveDrive = (payload) => {
    if (driveToEdit) {
      updateDrive(driveToEdit.id, payload);
      const updated = drives.map((d) =>
        d.id === driveToEdit.id ? { ...d, ...payload } : d
      );
      onDrivesChange(updated);
      showToast(`Updated "${payload.role} @ ${payload.companyName}" successfully.`);
    } else {
      const newDrive = addDrive(payload);
      onDrivesChange([newDrive, ...drives]);
      showToast(`Created drive: "${payload.role} @ ${payload.companyName}".`);
    }
    setIsModalOpen(false);
    setDriveToEdit(null);
  };

  const handleConfirmDelete = (id) => {
    const targetLabel = driveToDelete
      ? `${driveToDelete.role} @ ${driveToDelete.companyName}`
      : 'Drive';
    const remaining = deleteDrive(id);
    onDrivesChange(remaining);
    setIsDeleteModalOpen(false);
    setDriveToDelete(null);
    showToast(`Deleted "${targetLabel}".`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
    setBranchFilter('ALL');
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'ALL' || branchFilter !== 'ALL';

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center p-4 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 text-xs font-medium space-x-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 dark:text-slate-500 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Placement Drives</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              {drives.length} Total
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">
            Manage campus recruitment drives, eligibility criteria, and schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Create Drive
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-center shadow-xs">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{drives.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-0.5">Total Drives</p>
        </div>
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-center shadow-xs">
          <p className="text-2xl font-bold text-indigo-700">{upcomingCount}</p>
          <p className="text-xs text-indigo-600 mt-0.5">Upcoming</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-center shadow-xs">
          <p className="text-2xl font-bold text-amber-700">{ongoingCount}</p>
          <p className="text-xs text-amber-600 mt-0.5">Ongoing</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-center shadow-xs">
          <p className="text-2xl font-bold text-emerald-700">{completedCount}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Completed</p>
        </div>
      </div>

      {/* Demo notice */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start space-x-3 text-amber-900 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Demo Environment: </span>
          Drive records below are synthetic and configured for portfolio showcase. You can create, edit, or delete drives — all changes persist in your browser session via localStorage.
        </div>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, role, or location..."
            className="w-full text-xs sm:text-sm pl-9 pr-8 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:text-slate-500"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters & toggle */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Status filter */}
          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-slate-700 dark:text-slate-300 outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Status</option>
              {DRIVE_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Branch filter */}
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-slate-700 dark:text-slate-300 outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Depts</option>
            {AVAILABLE_DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}

          {/* Grid / Table toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              title="Table View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredDrives.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">
            {drives.length === 0 ? 'No drives created yet' : 'No matching drives found'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 max-w-sm mx-auto mb-5">
            {drives.length === 0
              ? 'Start by creating a placement drive or restore the demo dataset.'
              : 'No drives match your current search and filter criteria.'}
          </p>
          {drives.length > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center text-xs font-semibold px-3.5 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center text-xs font-semibold px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create Drive
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDrives.map((drive) => (
            <DriveCard
              key={drive.id}
              drive={drive}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      ) : (
        <DriveTable
          drives={filteredDrives}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Modals */}
      <DriveModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDriveToEdit(null);
        }}
        onSave={handleSaveDrive}
        driveToEdit={driveToEdit}
        companies={companies}
      />

      <DriveDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDriveToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        drive={driveToDelete}
      />
    </div>
  );
};

export default DriveList;
