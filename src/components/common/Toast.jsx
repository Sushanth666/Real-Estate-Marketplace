import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export function Toast() {
  const { toastMessage } = useMarketplace();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ type: 'spring', damping: 20, stiffness: 320 }}
          className="pointer-events-auto flex items-center gap-3 bg-slate-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-brand-950/50 backdrop-blur-md border border-brand-500/30 max-w-md text-sm font-medium glow-card"
        >
          {icons[toastMessage.type] || <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />}
          <span>{toastMessage.message}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
