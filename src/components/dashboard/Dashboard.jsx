import React, { useMemo } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  IndianRupee,
  CalendarDays,
  MapPin,
  GraduationCap,
  Info,
  ArrowRight
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Badge } from '../common/Badge';
import { getDriveStatusVariant } from '../drives/DriveCard';

// ── Helpers ─────────────────────────────────────────────────────────────────

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

// ── KPI Card ─────────────────────────────────────────────────────────────────
const KpiCard = ({ icon: Icon, label, value, sub, accent }) => {
  const ACCENT = {
    indigo:  { bg: 'bg-indigo-50',  icon: 'bg-indigo-100 text-indigo-700',  value: 'text-indigo-700',  border: 'border-indigo-200/60' },
    emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-700', value: 'text-emerald-700', border: 'border-emerald-200/60' },
    amber:   { bg: 'bg-amber-50',   icon: 'bg-amber-100 text-amber-700',    value: 'text-amber-700',   border: 'border-amber-200/60' },
    blue:    { bg: 'bg-blue-50',    icon: 'bg-blue-100 text-blue-700',      value: 'text-blue-700',    border: 'border-blue-200/60' },
    slate:   { bg: 'bg-white',      icon: 'bg-slate-100 text-slate-700',    value: 'text-slate-900',   border: 'border-slate-200' },
  };
  const c = ACCENT[accent] || ACCENT.slate;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5 shadow-xs flex items-start space-x-4`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.icon}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
        <p className={`text-2xl font-bold leading-none ${c.value}`}>{value}</p>
        {sub && <p className="text-[11px] text-slate-500 mt-1">{sub}</p>}
      </div>
    </div>
  );
};

// ── Custom Pie tooltip ────────────────────────────────────────────────────────
const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white border border-slate-200 shadow-md rounded-xl px-3 py-2 text-xs">
      <p className="font-semibold text-slate-800">{name}</p>
      <p className="text-slate-500">{value} student{value !== 1 ? 's' : ''}</p>
    </div>
  );
};

// ── Upcoming Drive row ────────────────────────────────────────────────────────
const DriveRow = ({ drive, onNavigate }) => (
  <div className="flex items-start justify-between py-3.5 border-b border-slate-100 last:border-0 gap-4">
    <div className="min-w-0">
      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
        <span className="text-sm font-bold text-slate-900 truncate">{drive.role}</span>
        <Badge variant={getDriveStatusVariant(drive.status)} size="xs">{drive.status}</Badge>
      </div>
      <p className="text-xs font-medium text-indigo-600 mb-1">{drive.companyName}</p>
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <CalendarDays className="w-3 h-3" /> {formatDate(drive.driveDate)}
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {drive.location || '—'}
        </span>
        <span className="flex items-center gap-1">
          <GraduationCap className="w-3 h-3" /> Min CGPA {drive.minCGPA}
        </span>
      </div>
    </div>
    <div className="text-right shrink-0">
      <p className="text-sm font-bold text-emerald-700">₹{drive.packageLPA} LPA</p>
      <p className="text-[11px] text-slate-400 mt-0.5">{drive.registeredCount ?? 0} registered</p>
    </div>
  </div>
);

// ── Main Dashboard ────────────────────────────────────────────────────────────
const PIE_COLORS = {
  Placed:      '#10b981', // emerald-500
  Unplaced:    '#f59e0b', // amber-500
  'Opted Out': '#94a3b8', // slate-400
};

export const Dashboard = ({ companies, students, drives, onNavigate }) => {
  // ── Calculations (all derived, never hardcoded) ──────────────────────────

  // Placed students and average package
  const placedStudents = useMemo(
    () => students.filter((s) => s.status === 'Placed'),
    [students]
  );
  const unplacedStudents = useMemo(
    () => students.filter((s) => s.status === 'Unplaced'),
    [students]
  );
  const optedOutStudents = useMemo(
    () => students.filter((s) => s.status === 'Opted Out'),
    [students]
  );

  // Average package — from placedDetails.packageLPA of placed students
  const avgPackage = useMemo(() => {
    const packages = placedStudents
      .map((s) => s.placedDetails?.packageLPA)
      .filter((p) => typeof p === 'number' && p > 0);
    if (packages.length === 0) return null;
    const avg = packages.reduce((sum, p) => sum + p, 0) / packages.length;
    return avg.toFixed(1);
  }, [placedStudents]);

  // Placement rate
  const placementRate = useMemo(() => {
    if (students.length === 0) return 0;
    return Math.round((placedStudents.length / students.length) * 100);
  }, [students, placedStudents]);

  // Active drives = Upcoming + Ongoing
  const activeDrives = useMemo(
    () => drives.filter((d) => d.status === 'Upcoming' || d.status === 'Ongoing'),
    [drives]
  );

  // Upcoming drives panel — sort by driveDate asc, show top 5
  const upcomingDrives = useMemo(() => {
    return [...activeDrives]
      .sort((a, b) => new Date(a.driveDate) - new Date(b.driveDate))
      .slice(0, 5);
  }, [activeDrives]);

  // Pie chart data
  const pieData = useMemo(() => {
    const data = [];
    if (placedStudents.length)    data.push({ name: 'Placed',      value: placedStudents.length });
    if (unplacedStudents.length)  data.push({ name: 'Unplaced',    value: unplacedStudents.length });
    if (optedOutStudents.length)  data.push({ name: 'Opted Out',   value: optedOutStudents.length });
    return data;
  }, [placedStudents, unplacedStudents, optedOutStudents]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">
          Live overview of your campus placement activity.
        </p>
      </div>

      {/* Demo notice */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex items-start space-x-3 text-amber-900 text-xs">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Demo Environment: </span>
          All numbers below are derived live from the synthetic dataset stored in your browser (localStorage). They update automatically when you add, edit, or delete records in other sections.
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          icon={Building2}
          label="Companies"
          value={companies.length}
          sub="registered partners"
          accent="indigo"
        />
        <KpiCard
          icon={Users}
          label="Students"
          value={students.length}
          sub="total registered"
          accent="slate"
        />
        <KpiCard
          icon={Briefcase}
          label="Active Drives"
          value={activeDrives.length}
          sub="upcoming + ongoing"
          accent="amber"
        />
        <KpiCard
          icon={TrendingUp}
          label="Students Placed"
          value={placedStudents.length}
          sub={`${placementRate}% placement rate`}
          accent="emerald"
        />
        <KpiCard
          icon={IndianRupee}
          label="Avg Package"
          value={avgPackage ? `₹${avgPackage} LPA` : '—'}
          sub={avgPackage ? 'across placed students' : 'no placements yet'}
          accent="blue"
        />
      </div>

      {/* ── Middle row: Placement Overview + Pie chart ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Placement Overview */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Placement Overview</h2>

          {students.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">No student records yet.</p>
          ) : (
            <div className="space-y-3">
              {/* Placed */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Placed</span>
                  <span className="font-bold text-emerald-700">
                    {placedStudents.length} / {students.length}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(placedStudents.length / students.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Seeking Placement (Unplaced) */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Seeking Placement</span>
                  <span className="font-bold text-amber-700">
                    {unplacedStudents.length} / {students.length}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${(unplacedStudents.length / students.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Opted Out */}
              {optedOutStudents.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-700">Opted Out</span>
                    <span className="font-bold text-slate-500">
                      {optedOutStudents.length} / {students.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-2.5 rounded-full bg-slate-400 transition-all duration-500"
                      style={{ width: `${(optedOutStudents.length / students.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Stat pills */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl py-2.5 px-2">
                  <p className="text-lg font-bold text-emerald-700">{placedStudents.length}</p>
                  <p className="text-[10px] text-emerald-600 mt-0.5">Placed</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl py-2.5 px-2">
                  <p className="text-lg font-bold text-amber-700">{unplacedStudents.length}</p>
                  <p className="text-[10px] text-amber-600 mt-0.5">Unplaced</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl py-2.5 px-2">
                  <p className="text-lg font-bold text-slate-600">{optedOutStudents.length}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Opted Out</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Placement Status Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Placement Status Distribution</h2>
          {pieData.length === 0 ? (
            <div className="flex items-center justify-center h-48">
              <p className="text-xs text-slate-400">No student data to display.</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[entry.name] || '#94a3b8'}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span className="text-xs text-slate-600 font-medium">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Upcoming Drives ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-800">Upcoming &amp; Active Drives</h2>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('drives')}
              className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              View all <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          )}
        </div>

        {upcomingDrives.length === 0 ? (
          <div className="py-10 text-center">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No upcoming or active drives at the moment.</p>
          </div>
        ) : (
          <div>
            {upcomingDrives.map((drive) => (
              <DriveRow key={drive.id} drive={drive} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
