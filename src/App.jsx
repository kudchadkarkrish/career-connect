import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CompanyList from './components/companies/CompanyList';
import StudentList from './components/students/StudentList';
import DriveList from './components/drives/DriveList';
import EligibilityChecker from './components/eligibility/EligibilityChecker';
import Analytics from './components/analytics/Analytics';
import { initStorage, resetToDemoData } from './services/storageService';
import { Clock, Building2 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const data = initStorage();
    setCompanies(data.companies);
    setStudents(data.students);
    setDrives(data.drives);
  }, []);

  const handleResetData = () => {
    if (window.confirm('Reset all demo data (companies, students, drives) to initial sample records?')) {
      const fresh = resetToDemoData();
      setCompanies(fresh.companies);
      setStudents(fresh.students);
      setDrives(fresh.drives);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 dark:text-slate-100 text-slate-800 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onResetData={handleResetData}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <Dashboard
            companies={companies}
            students={students}
            drives={drives}
            onNavigate={setActiveTab}
          />
        ) : activeTab === 'companies' ? (
          <CompanyList
            companies={companies}
            onCompaniesChange={setCompanies}
          />
        ) : activeTab === 'students' ? (
          <StudentList
            students={students}
            onStudentsChange={setStudents}
          />
        ) : activeTab === 'drives' ? (
          <DriveList
            drives={drives}
            onDrivesChange={setDrives}
            companies={companies}
          />
        ) : activeTab === 'eligibility' ? (
          <EligibilityChecker
            students={students}
            drives={drives}
          />
        ) : activeTab === 'analytics' ? (
          <Analytics
            students={students}
            drives={drives}
            companies={companies}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-xs max-w-lg mx-auto mt-12">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100 dark:border-indigo-900">
              <Clock className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 capitalize mb-2">
              {activeTab.replace(/-/g, ' ')} Section
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              This section is coming soon. Companies, Students, and Placement Drives are fully functional.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('companies')}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-200 transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 mr-1.5" />
              Go to Companies
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-xs text-slate-400 dark:text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Placement Drive Tracker — Internal Training &amp; Placement Office Tool</span>
          <span className="text-slate-500 font-medium">Demo Portfolio Project • Persistent LocalStorage</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

