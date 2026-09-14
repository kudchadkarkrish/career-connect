import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../common/Modal';

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, company }) => {
  if (!company) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Company" maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-300">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold mb-1">Confirm Deletion</p>
            <p>
              Are you sure you want to remove <span className="font-bold">{company.name}</span> from
              the recruiter directory?
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          This company will be removed from your local records. Any historical drives or student
          records linked to this company will retain their historical names.
        </p>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(company.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm shadow-rose-200 transition-colors cursor-pointer"
          >
            Delete Company
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
