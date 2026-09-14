import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../common/Modal';

export const StudentDeleteModal = ({ isOpen, onClose, onConfirm, student }) => {
  if (!student) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Student Record" maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start space-x-3 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold mb-1">Confirm Deletion</p>
            <p>
              Are you sure you want to remove{' '}
              <span className="font-bold">{student.name}</span>{' '}
              ({student.rollNo}) from the student directory?
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          This student record will be removed from your local browser storage. This action cannot
          be undone, but you can always restore all demo data using the Reset button.
        </p>

        <div className="border-t border-slate-100 pt-4 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(student.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm shadow-rose-200 transition-colors cursor-pointer"
          >
            Delete Student
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StudentDeleteModal;
