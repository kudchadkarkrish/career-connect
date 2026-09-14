import React from 'react';
import {
  GraduationCap,
  Building2,
  Users,
  Briefcase,
  CheckSquare,
  BarChart3,
  LayoutDashboard,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const Navbar = ({ activeTab, onTabChange, onResetData }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, ready: false },
    { id: 'companies', label: 'Companies', icon: Building2, ready: true },
    { id: 'students', label: 'Students', icon: Users, ready: true },
    { id: 'drives', label: 'Placement Drives', icon: Briefcase, ready: false },
    { id: 'eligibility', label: 'Eligibility', icon: CheckSquare, ready: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, ready: false },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Portal Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight">
                  Placement Drive Tracker
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-amber-500" />
                  Demo Mode
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Training & Placement Cell Portal
              </p>
            </div>
          </div>

          {/* Right Action: Reset button */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onResetData}
              title="Restore initial synthetic sample records"
              className="inline-flex items-center text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              <span className="hidden md:inline">Reset Demo Data</span>
              <span className="md:hidden">Reset</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-1 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {!item.ready && (
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


