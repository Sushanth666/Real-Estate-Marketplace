import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Trash2, Scale, Sparkles, Building2 } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { PropertyCard } from '../common/PropertyCard';
import { formatIndianCurrency } from '../../utils/formatters';

export function WishlistView() {
  const { 
    properties, 
    wishlist, 
    currentUser,
    navigateTo, 
    setIsCompareModalOpen, 
    setIsAuthModalOpen,
    setAuthModalMode,
    toggleWishlist,
    showToast
  } = useMarketplace();

  const savedProperties = properties.filter(p => wishlist.includes(p.id));

  const totalValue = savedProperties.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
              <span>Home</span>
              <span>/</span>
              <span className="text-slate-700">My Saved Residences</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight flex items-center gap-3">
              <span>Saved Properties</span>
              {currentUser && (
                <span className="text-sm bg-rose-100 text-rose-700 font-bold px-3 py-1 rounded-full border border-rose-200">
                  {savedProperties.length} Homes
                </span>
              )}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {currentUser 
                ? `Personal shortlist saved for ${currentUser.name} (${currentUser.email})` 
                : 'Saving luxury residences across India is secured with your verified account.'}
            </p>
          </div>

          {/* Quick Portfolio Stats */}
          {currentUser && savedProperties.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                  Total Shortlist Value
                </span>
                <span className="text-xl font-extrabold font-display text-slate-900">
                  {formatIndianCurrency(totalValue)}
                </span>
              </div>

              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Matrix</span>
              </button>
            </div>
          )}
        </div>

        {/* Auth Gate Guard: When User Is Not Logged In */}
        {!currentUser ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200/80 shadow-md max-w-xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-sm">
              <Heart className="w-8 h-8 fill-rose-500/20" />
            </div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full mb-3 inline-block">
              Account Login Required
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-2">
              Sign in to Access Your Saved Homes
            </h2>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              In BharatNivas, saving residences is protected with your verified user profile so your shortlist, price alerts, and site visit schedules stay safely synced across devices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="bg-slate-900 hover:bg-brand-700 text-white font-bold px-7 py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>Sign In to Your Account</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setAuthModalMode('register');
                  setIsAuthModalOpen(true);
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-7 py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Create Free Account</span>
              </motion.button>
            </div>
          </motion.div>
        ) : savedProperties.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-16 text-center border border-slate-200/80 shadow-xs max-w-xl mx-auto"
          >
            <motion.div 
              animate={{ scale: [1, 1.1, 1], y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 shadow-xs shadow-rose-100"
            >
              <Heart className="w-8 h-8 fill-rose-500/20" />
            </motion.div>
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Browse our verified luxury collection of penthouses, villas, and apartments in Mumbai, Bengaluru, Delhi NCR, and Chennai, and click the heart icon to save.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigateTo('listings')}
              className="bg-slate-900 hover:bg-brand-700 text-white font-bold px-7 py-3 rounded-2xl text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {savedProperties.map(property => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
                >
                  <PropertyCard property={property} layout="grid" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}
