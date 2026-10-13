import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export function ComparisonBar() {
  const { 
    properties, 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    setIsCompareModalOpen 
  } = useMarketplace();

  if (compareList.length === 0) return null;

  const comparedProperties = properties.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="pointer-events-auto bg-slate-950/95 backdrop-blur-xl text-white rounded-3xl p-3.5 sm:p-4 shadow-2xl border border-slate-700 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Scale className="w-5 h-5" />
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-bold text-white leading-tight">
              Compare Properties ({comparedProperties.length}/4)
            </p>
            <p className="text-[11px] text-slate-400">
              Side-by-side specs, price per sqft & amenities
            </p>
          </div>

          {/* Mini thumbnails */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {comparedProperties.map(prop => (
              <div key={prop.id} className="relative group shrink-0">
                <img
                  src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=100&q=80'}
                  alt={prop.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=100&q=80';
                  }}
                  className="w-9 h-9 rounded-xl object-cover border border-white/20"
                />
                <button
                  onClick={() => removeFromCompare(prop.id)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] hover:scale-110 transition-transform"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="p-2 text-slate-400 hover:text-white text-xs transition-colors"
            title="Clear comparison"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="bg-brand-500 hover:bg-brand-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-500/20 transition-all"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
