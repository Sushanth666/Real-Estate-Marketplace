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

  const comparedProperties = properties.filter(p => compareList.includes(p.id));

  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl pointer-events-none">
          <motion.div
            layout
            initial={{ opacity: 0, y: 60, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.93, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            className="pointer-events-auto bg-slate-950/95 backdrop-blur-xl text-white rounded-3xl p-3.5 sm:p-4 shadow-2xl border border-slate-700/80 flex items-center justify-between gap-4 relative overflow-hidden"
          >
            {/* Ambient subtle top border highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-400/50 to-transparent pointer-events-none" />

            <div className="flex items-center gap-3 min-w-0">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-brand-600/30"
              >
                <Scale className="w-5 h-5" />
              </motion.div>

              <div className="hidden sm:block">
                <p className="text-xs font-bold text-white leading-tight flex items-center gap-1.5">
                  <span>Compare Properties</span>
                  <span className="bg-brand-500/20 text-brand-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono border border-brand-500/30">
                    {comparedProperties.length}/4
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Side-by-side specs, price per sqft & amenities
                </p>
              </div>

              {/* Mini thumbnails with fluid layout animation */}
              <div className="flex items-center gap-2 overflow-x-auto py-1">
                <AnimatePresence mode="popLayout">
                  {comparedProperties.map(prop => (
                    <motion.div 
                      key={prop.id} 
                      layout
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="relative group shrink-0"
                    >
                      <img
                        src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=100&q=80'}
                        alt={prop.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=100&q=80';
                        }}
                        className="w-9 h-9 rounded-xl object-cover border border-white/20 shadow-xs"
                      />
                      <motion.button
                        whileHover={{ scale: 1.25 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => removeFromCompare(prop.id)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] shadow-sm cursor-pointer"
                        title="Remove"
                      >
                        <X className="w-2.5 h-2.5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearCompare}
                className="p-2 text-slate-400 hover:text-rose-400 text-xs transition-colors cursor-pointer"
                title="Clear comparison"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsCompareModalOpen(true)}
                className="bg-brand-500 hover:bg-brand-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-md shadow-brand-500/25 transition-all cursor-pointer"
              >
                <span>Compare Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
