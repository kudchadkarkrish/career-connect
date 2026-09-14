import React, { useState, useMemo } from 'react';
import {
  Building2,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import CompanyCard from './CompanyCard';
import CompanyTable from './CompanyTable';
import CompanyModal from './CompanyModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import { addCompany, updateCompany, deleteCompany } from '../../services/storageService';

export const CompanyList = ({ companies, onCompaniesChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Filter logic
  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.industry && c.industry.toLowerCase().includes(q)) ||
        (c.location && c.location.toLowerCase().includes(q)) ||
        (Array.isArray(c.rolesOffered) &&
          c.rolesOffered.some((r) => r.toLowerCase().includes(q)));

      const matchesTier =
        tierFilter === 'ALL' || c.tier === tierFilter;

      const matchesStatus =
        statusFilter === 'ALL' || (c.status || 'Active Partner') === statusFilter;

      return matchesSearch && matchesTier && matchesStatus;
    });
  }, [companies, searchTerm, tierFilter, statusFilter]);

  // Handlers
  const handleOpenAdd = () => {
    setCompanyToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (company) => {
    setCompanyToEdit(company);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (company) => {
    setCompanyToDelete(company);
    setIsDeleteModalOpen(true);
  };

  const handleSaveCompany = (payload) => {
    if (companyToEdit) {
      updateCompany(companyToEdit.id, payload);
      const updated = companies.map((c) =>
        c.id === companyToEdit.id ? { ...c, ...payload } : c
      );
      onCompaniesChange(updated);
      showToast(`Updated "${payload.name}" successfully.`);
    } else {
      const newCompany = addCompany(payload);
      onCompaniesChange([newCompany, ...companies]);
      showToast(`Added "${payload.name}" to directory.`);
    }
    setIsModalOpen(false);
    setCompanyToEdit(null);
  };

  const handleConfirmDelete = (id) => {
    const deleted = deleteCompany(id);
    onCompaniesChange(deleted);
    setIsDeleteModalOpen(false);
    const targetName = companyToDelete?.name || 'Company';
    setCompanyToDelete(null);
    showToast(`Deleted "${targetName}" from directory.`, 'info');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTierFilter('ALL');
    setStatusFilter('ALL');
  };

  return (
    <div className="space-y-6">
      {/* Toast alert banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center p-4 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 transition-all text-xs font-medium space-x-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Recruiting Companies
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              {companies.length} Total
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage partner recruiters, tier classifications, hiring profiles, and compensation packages.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Company
          </button>
        </div>
      </div>

      {/* Subtle Demo Data Notice Banner */}
      <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 rounded-xl p-3.5 flex items-start space-x-3 text-amber-900 dark:text-amber-300 text-xs">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Demo Environment: </span>
          The companies below are synthetic records configured for portfolio showcase. You can add new companies, modify existing roles/CTC, or delete records. All changes persist in your browser session.
        </div>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, industry, or role..."
            className="w-full text-xs sm:text-sm pl-9 pr-8 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters and View toggle */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Tier Filter */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-slate-700 dark:text-slate-300 outline-hidden focus:border-indigo-500"
            >
              <option value="ALL">All Tiers</option>
              <option value="Tier-1 Dream">Tier-1 Dream</option>
              <option value="Tier-1 Core">Tier-1 Core</option>
              <option value="Tier-1">Tier-1</option>
              <option value="Tier-2">Tier-2</option>
              <option value="Tier-2 Core">Tier-2 Core</option>
              <option value="Mass Recruiter">Mass Recruiter</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 text-slate-700 dark:text-slate-300 outline-hidden focus:border-indigo-500"
          >
            <option value="ALL">All Status</option>
            <option value="Active Partner">Active Partner</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Grid / Table Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              title="Table View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area / Empty States */}
      {filteredCompanies.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            {companies.length === 0 ? 'No companies registered' : 'No matching companies found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
            {companies.length === 0
              ? 'Start by adding a partner company or restore the synthetic demo dataset.'
              : `No companies match your search "${searchTerm}" with selected filters.`}
          </p>
          {companies.length > 0 ? (
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
              Add Company
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      ) : (
        <CompanyTable
          companies={filteredCompanies}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Modals */}
      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCompanyToEdit(null);
        }}
        onSave={handleSaveCompany}
        companyToEdit={companyToEdit}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCompanyToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        company={companyToDelete}
      />
    </div>
  );
};

export default CompanyList;
