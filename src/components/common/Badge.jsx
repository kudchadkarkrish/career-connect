import React from 'react';

const VARIANT_MAP = {
  indigo:  'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/50',
  purple:  'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/50',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-800/50',
  blue:    'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/50',
  amber:   'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/50',
  rose:    'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200/60 dark:border-rose-800/50',
  slate:   'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60',
};

export const Badge = ({ children, variant = 'slate', size = 'sm', className = '' }) => {
  const sizeClasses = size === 'xs' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  const colorClasses = VARIANT_MAP[variant] || VARIANT_MAP.slate;

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border ${sizeClasses} ${colorClasses} ${className}`}
    >
      {children}
    </span>
  );
};

export const getTierVariant = (tier = '') => {
  if (tier.includes('Dream')) return 'purple';
  if (tier.includes('Core')) return 'blue';
  if (tier.includes('Tier-1')) return 'indigo';
  if (tier.includes('Tier-2')) return 'amber';
  if (tier.includes('Mass')) return 'emerald';
  return 'slate';
};

export default Badge;
