import React, { useMemo } from 'react';
import {
  TrendingUp,
  IndianRupee,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  BarChart3,
  Info,
  CalendarDays,
  CheckCircle2,
  Clock,
  Building2,
  Sparkles
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from '../common/Badge';
import { AVAILABLE_DEPARTMENTS, DRIVE_STATUSES } from '../../data/mockData';

// ── Status Color Mappings ───────────────────────────────────────────────────
const DRIVE_STATUS_COLORS = {
  Upcoming:  '#6366f1', // Indigo
  Ongoing:   '#f59e0b', // Amber
  Completed: '#10b981', // Emerald
  Cancelled: '#f43f5e', // Rose
};

const BRANCH_BADGE_VARIANTS = {
  CSE: 'indigo',
  IT:  'blue',
  ECE: 'purple',
  ME:  'amber',
  CE:  'emerald',
};

// ── KPI Card Component ──────────────────────────────────────────────────────
const KpiCard = ({ icon: Icon, label, value, sub, accent }) => {
  const ACCENT = {
    indigo:  { bg: 'bg-indigo-50 dark:bg-indigo-950/40',  icon: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400',  value: 'text-indigo-700 dark:text-indigo-400',  border: 'border-indigo-200/60 dark:border-indigo-800/60' },
    emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', icon: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400', value: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200/60 dark:border-emerald-800/60' },
    amber:   { bg: 'bg-amber-50 dark:bg-amber-950/40',   icon: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400',    value: 'text-amber-700 dark:text-amber-400',   border: 'border-amber-200/60 dark:border-amber-800/60' },
    blue:    { bg: 'bg-blue-50 dark:bg-blue-950/40',    icon: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400',      value: 'text-blue-700 dark:text-blue-400',    border: 'border-blue-200/60 dark:border-blue-800/60' },
    purple:  { bg: 'bg-purple-50 dark:bg-purple-950/40',  icon: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400',  value: 'text-purple-700 dark:text-purple-400',  border: 'border-purple-200/60 dark:border-purple-800/60' },
    slate:   { bg: 'bg-white dark:bg-slate-900',      icon: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',    value: 'text-slate-900 dark:text-slate-100',   border: 'border-slate-200 dark:border-slate-700' },
  };
  const c = ACCENT[accent] || ACCENT.slate;

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5 shadow-xs flex items-start space-x-4`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.icon}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className={`text-2xl font-bold leading-none ${c.value}`}>
          {value}
        </p>
        {sub && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
};

// ── Custom Tooltips for Recharts ────────────────────────────────────────────
const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md rounded-xl p-3 text-xs">
      <p className="font-bold text-slate-900 dark:text-slate-100 mb-1.5">{label} Department</p>
      {payload.map((entry, idx) => (
        <div key={idx} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: entry.color }} />
            {entry.name}:
          </span>
          <span className="font-semibold text-slate-900 dark:text-slate-100">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-md rounded-xl px-3 py-2 text-xs">
      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 mb-0.5">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.payload.fill }} />
        {item.name}
      </div>
      <p className="text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-900 dark:text-slate-100">{item.value}</span> drive{item.value !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

// ── Main Analytics Component ────────────────────────────────────────────────
export const Analytics = ({ students = [], drives = [], companies = [] }) => {
  const { isDark } = useTheme();

  // ── 1. Placement Rates & Overview ─────────────────────────────────────────
  const totalStudents = students.length;
  const placedStudents = useMemo(
    () => students.filter((s) => s.status === 'Placed'),
    [students]
  );
  const unplacedStudents = useMemo(
    () => students.filter((s) => s.status === 'Unplaced'),
    [students]
  );

  // Overall placement rate % (placed / total * 100)
  const placementRate = useMemo(() => {
    if (totalStudents === 0) return 0;
    return Number(((placedStudents.length / totalStudents) * 100).toFixed(1));
  }, [totalStudents, placedStudents.length]);

  // ── 2. Package Calculations ───────────────────────────────────────────────
  // Extract packages for placed students, ignoring null/undefined/missing or <= 0
  const validPackages = useMemo(() => {
    return placedStudents
      .map((s) => s.placedDetails?.packageLPA)
      .filter((p) => typeof p === 'number' && p > 0);
  }, [placedStudents]);

  const avgPackage = useMemo(() => {
    if (validPackages.length === 0) return null;
    const sum = validPackages.reduce((acc, p) => acc + p, 0);
    return (sum / validPackages.length).toFixed(1);
  }, [validPackages]);

  const highestPackage = useMemo(() => {
    if (validPackages.length === 0) return null;
    return Math.max(...validPackages).toFixed(1);
  }, [validPackages]);

  // Top offer details (who bagged the highest CTC)
  const topOfferStudent = useMemo(() => {
    if (placedStudents.length === 0) return null;
    let top = null;
    let maxCtc = -1;
    placedStudents.forEach((s) => {
      const ctc = s.placedDetails?.packageLPA;
      if (typeof ctc === 'number' && ctc > maxCtc) {
        maxCtc = ctc;
        top = s;
      }
    });
    return top;
  }, [placedStudents]);

  // ── 3. Department-wise Placement Data ─────────────────────────────────────
  const departmentData = useMemo(() => {
    // Collect all departments (seed constants + any custom branch in student records)
    const deptList = Array.from(
      new Set([
        ...AVAILABLE_DEPARTMENTS,
        ...students.map((s) => s.branch).filter(Boolean)
      ])
    );

    return deptList.map((dept) => {
      const deptStudents = students.filter((s) => s.branch === dept);
      const placed = deptStudents.filter((s) => s.status === 'Placed').length;
      const unplaced = deptStudents.filter((s) => s.status === 'Unplaced').length;
      const total = deptStudents.length;
      const rate = total > 0 ? Math.round((placed / total) * 100) : 0;

      // Avg CTC in this department
      const deptPackages = deptStudents
        .filter((s) => s.status === 'Placed')
        .map((s) => s.placedDetails?.packageLPA)
        .filter((p) => typeof p === 'number' && p > 0);
      const deptAvgCtc = deptPackages.length > 0
        ? (deptPackages.reduce((a, b) => a + b, 0) / deptPackages.length).toFixed(1)
        : null;

      return {
        department: dept,
        total,
        placed,
        unplaced,
        rate,
        avgCtc: deptAvgCtc
      };
    });
  }, [students]);

  // ── 4. Drive Status Distribution ──────────────────────────────────────────
  const totalDrives = drives.length;

  const driveStatusCounts = useMemo(() => {
    const counts = {
      Upcoming: 0,
      Ongoing: 0,
      Completed: 0,
      Cancelled: 0,
    };
    drives.forEach((d) => {
      if (counts[d.status] !== undefined) {
        counts[d.status]++;
      } else {
        counts[d.status] = (counts[d.status] || 0) + 1;
      }
    });
    return counts;
  }, [drives]);

  const driveStatusData = useMemo(() => {
    return DRIVE_STATUSES.map((status) => ({
      name: status,
      value: driveStatusCounts[status] || 0,
      fill: DRIVE_STATUS_COLORS[status] || '#94a3b8'
    })).filter((item) => item.value > 0);
  }, [driveStatusCounts]);

  const activeDrivesCount = (driveStatusCounts['Upcoming'] || 0) + (driveStatusCounts['Ongoing'] || 0);

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Placement Analytics &amp; Insights
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics on student placement performance, branch-wise recruitment, and drive status.
        </p>
      </div>

      {/* ── Demo Notice Banner ── */}
      <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 rounded-xl p-3.5 flex items-start space-x-3 text-amber-900 dark:text-amber-300 text-xs">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Demo Environment: </span>
          All charts and statistics are computed live from current student and drive records in your browser session. Adding, modifying, or deleting records updates these analytics in real time.
        </div>
      </div>

      {/* ── Summary KPI Cards (4 metrics as requested) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={TrendingUp}
          label="Placement Rate"
          value={`${placementRate}%`}
          sub={`${placedStudents.length} of ${totalStudents} students placed`}
          accent="emerald"
        />
        <KpiCard
          icon={IndianRupee}
          label="Average Package"
          value={avgPackage ? `₹${avgPackage} LPA` : '—'}
          sub={avgPackage ? `Across ${validPackages.length} placed students` : 'No placement offers recorded'}
          accent="blue"
        />
        <KpiCard
          icon={Award}
          label="Highest Package"
          value={highestPackage ? `₹${highestPackage} LPA` : '—'}
          sub={
            topOfferStudent
              ? `${topOfferStudent.name} (${topOfferStudent.placedDetails?.companyName || 'Offer'})`
              : 'No offers recorded'
          }
          accent="purple"
        />
        <KpiCard
          icon={Briefcase}
          label="Placement Drives"
          value={totalDrives}
          sub={`${activeDrivesCount} upcoming or ongoing`}
          accent="indigo"
        />
      </div>

      {/* ── Main Charts Grid: Department Placement (Bar) & Drive Status (Donut) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Department-wise Placement Bar Chart (2 cols on lg) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Department-wise Placement
              </h2>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Placed vs. Total Students
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Comparison of placed students against total enrolled cohort by engineering branch.
            </p>
          </div>

          {totalStudents === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-xs text-slate-400 dark:text-slate-500">No student records available to chart.</p>
            </div>
          ) : (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentData}
                  margin={{ top: 15, right: 15, left: -10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#334155' : '#e2e8f0'}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="department"
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: isDark ? '#334155' : '#cbd5e1' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: isDark ? '#334155' : '#cbd5e1' }}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ paddingBottom: 12 }}
                    formatter={(val) => (
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {val}
                      </span>
                    )}
                  />
                  <Bar
                    dataKey="placed"
                    name="Placed"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  <Bar
                    dataKey="total"
                    name="Total Students"
                    fill={isDark ? '#6366f1' : '#818cf8'}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Drive Status Distribution Donut Chart (1 col on lg) */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Drive Status Distribution
              </h2>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                {totalDrives} Total
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Breakdown of campus recruitment drives by their current stage.
            </p>
          </div>

          {totalDrives === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Briefcase className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-xs text-slate-400 dark:text-slate-500">No drives scheduled yet.</p>
            </div>
          ) : (
            <>
              <div className="w-full h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={driveStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {driveStatusData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Status breakdown grid */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                {DRIVE_STATUSES.map((status) => {
                  const count = driveStatusCounts[status] || 0;
                  const color = DRIVE_STATUS_COLORS[status];
                  return (
                    <div
                      key={status}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                          {status}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 ml-1">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>

      {/* ── Department Performance Breakdown Table ── */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Department Performance Summary
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Detailed statistics on enrollment, placement counts, and average compensation per department.
            </p>
          </div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
            {departmentData.length} Departments
          </span>
        </div>

        {totalStudents === 0 ? (
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-6">
            No department records available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-4 py-3">Department</th>
                  <th scope="col" className="px-4 py-3 text-center">Enrolled</th>
                  <th scope="col" className="px-4 py-3 text-center">Placed</th>
                  <th scope="col" className="px-4 py-3 text-center">Seeking</th>
                  <th scope="col" className="px-4 py-3">Placement Rate</th>
                  <th scope="col" className="px-4 py-3 text-right">Avg Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {departmentData.map((d) => (
                  <tr
                    key={d.department}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={BRANCH_BADGE_VARIANTS[d.department] || 'slate'}
                          size="xs"
                        >
                          {d.department}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center font-medium text-slate-900 dark:text-slate-100">
                      {d.total}
                    </td>
                    <td className="px-4 py-3.5 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                      {d.placed}
                    </td>
                    <td className="px-4 py-3.5 text-center text-amber-600 dark:text-amber-400">
                      {d.unplaced}
                    </td>
                    <td className="px-4 py-3.5 min-w-[160px]">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${d.rate}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-10 text-right">
                          {d.rate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-slate-900 dark:text-slate-100">
                      {d.avgCtc ? `₹${d.avgCtc} LPA` : <span className="text-slate-400 dark:text-slate-500 font-normal">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
