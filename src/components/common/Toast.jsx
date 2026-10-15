import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export function Toast() {
  const { toastMessage } = useMarketplace();

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence mode="wait">
        {toastMessage && (
          <motion.div
            key={toastMessage.message}
            initial={{ opacity: 0, y: 35, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92, transition: { duration: 0.22, ease: 'easeIn' } }}
            transition={{ type: 'spring', damping: 22, stiffness: 340 }}
            className="pointer-events-auto flex items-center gap-3 bg-slate-950/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/60 backdrop-blur-md border border-brand-500/40 max-w-md text-sm font-medium glow-card relative overflow-hidden"
          >
            <motion.div 
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
            />
            {icons[toastMessage.type] || <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />}
            <span className="leading-snug">{toastMessage.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
