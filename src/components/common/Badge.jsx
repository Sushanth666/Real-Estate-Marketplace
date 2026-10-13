import React from 'react';

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    rera: 'bg-brand-50 text-brand-700 border-brand-200/80 font-medium',
    luxury: 'bg-amber-50 text-amber-800 border-amber-200/80 font-medium',
    featured: 'bg-purple-50 text-purple-700 border-purple-200 font-medium',
    ready: 'bg-blue-50 text-blue-700 border-blue-200 font-medium',
    deal: 'bg-rose-50 text-rose-700 border-rose-200 font-medium',
    dark: 'bg-slate-900 text-slate-100 border-slate-700 font-medium',
    default: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border shadow-xs transition-all ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
