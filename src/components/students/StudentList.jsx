import React, { useState, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import StudentCard from './StudentCard';
import StudentTable from './StudentTable';
import StudentModal from './StudentModal';
import StudentDeleteModal from './StudentDeleteModal';
import { addStudent, updateStudent, deleteStudent } from '../../services/storageService';
import { AVAILABLE_DEPARTMENTS } from '../../data/mockData';

const PLACEMENT_STATUSES = ['Placed', 'Unplaced', 'Opted Out'];

export const StudentList = ({ students, onStudentsChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // Filtered list
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        (s.rollNo && s.rollNo.toLowerCase().includes(q)) ||
        (s.branch && s.branch.toLowerCase().includes(q)) ||
        (Array.isArray(s.skills) && s.skills.some((sk) => sk.toLowerCase().includes(q)));

      const matchesBranch = branchFilter === 'ALL' || s.branch === branchFilter;
      const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;

      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [students, searchTerm, branchFilter, statusFilter]);

  // Derived stats
  const placedCount = useMemo(() => students.filter((s) => s.status === 'Placed').length, [students]);
  const unplacedCount = useMemo(() => students.filter((s) => s.status === 'Unplaced').length, [students]);

  // Handlers
  const handleOpenAdd = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const handleOpenDelete = (student) => {
    setStudentToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const handleSaveStudent = (payload) => {
    if (studentToEdit) {
      updateStudent(studentToEdit.id, payload);
      const updated = students.map((s) =>
        s.id === studentToEdit.id ? { ...s, ...payload } : s
      );
      onStudentsChange(updated);
      showToast(`Updated "${payload.name}" successfully.`);
    } else {
      const newStudent = addStudent(payload);
      onStudentsChange([newStudent, ...students]);
      showToast(`Added "${payload.name}" to the directory.`);
    }
    setIsModalOpen(false);
    setStudentToEdit(null);
  };

  const handleConfirmDelete = (id) => {
    const targetName = studentToDelete?.name || 'Student';
    const remaining = deleteStudent(id);
    onStudentsChange(remaining);
    setIsDeleteModalOpen(false);
    setStudentToDelete(null);
    showToast(`Deleted "${targetName}" from the directory.`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setBranchFilter('ALL');
    setStatusFilter('ALL');
  };

  const hasActiveFilters = searchTerm || branchFilter !== 'ALL' || statusFilter !== 'ALL';

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center p-4 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 text-xs font-medium space-x-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Students Directory</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              {students.length} Total
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage student profiles, academic records, skills, and placement status.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Student
        </button>
      </div>

      {/* Quick stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-center shadow-xs">
          <p className="text-2xl font-bold text-slate-900">{students.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Students</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-center shadow-xs">
          <p className="text-2xl font-bold text-emerald-700">{placedCount}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Placed</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 text-center shadow-xs">
          <p className="text-2xl font-bold text-rose-700">{unplacedCount}</p>
          <p className="text-xs text-rose-600 mt-0.5">Unplaced</p>
        </div>
      </div>

      {/* Demo notice */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start space-x-3 text-amber-900 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Demo Environment: </span>
          The student records below are synthetic and curated for portfolio demonstration. You can add, edit, or delete records — all changes persist in your browser session via localStorage.
        </div>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, roll no, branch, or skill..."
            className="w-full text-xs sm:text-sm pl-9 pr-8 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 transition-colors"
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

        {/* Filters & toggle */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Branch filter */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Depts</option>
              {AVAILABLE_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 text-slate-700 outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Status</option>
            {PLACEMENT_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
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
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              title="Table View"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">
            {students.length === 0 ? 'No students registered' : 'No matching students found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
            {students.length === 0
              ? 'Start by adding a student or restore the demo dataset.'
              : `No students match your current search and filter criteria.`}
          </p>
          {students.length > 0 ? (
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
              Add Student
            </button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      ) : (
        <StudentTable
          students={filteredStudents}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      )}

      {/* Modals */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setStudentToEdit(null);
        }}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      <StudentDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setStudentToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        student={studentToDelete}
      />
    </div>
  );
};

export default StudentList;
